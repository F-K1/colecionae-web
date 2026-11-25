(function () {
    'use strict';

    var OPEN_DELAY = 120; // evita abrir ao apenas passar por cima da grade
    var canHover = window.matchMedia('(hover: hover)').matches;
    var slots = document.querySelectorAll('.card-slot-filled');
    if (!slots.length) return;

    var game = ['pokemon', 'magic', 'yugioh'].filter(function (g) {
        return document.body.classList.contains(g + '-collection');
    })[0] || 'pokemon';

    //monta o overlay uma única vez
    var overlay = document.createElement('div');
    overlay.className = 'card-preview ' + game;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
        '<div class="card-preview-inner">' +
            '<div class="card-preview-card"></div>' +
            '<aside class="card-preview-info">' +
                '<p class="eyebrow" data-f="colecao"></p>' +
                '<h2 data-f="nome"></h2>' +
                '<span class="card-preview-badge" data-f="raridade"></span>' +
                '<dl data-f="lista"></dl>' +
                '<p class="card-preview-hint"></p>' +
            '</aside>' +
        '</div>';
    document.body.appendChild(overlay);

    var cardEl = overlay.querySelector('.card-preview-card');
    var hint = overlay.querySelector('.card-preview-hint');
    hint.textContent = canHover ? 'Tire o mouse da carta para fechar' : 'Toque em qualquer lugar para fechar';

    function field(name) { return overlay.querySelector('[data-f="' + name + '"]'); }

    function fill(slot) {
        var d = slot.dataset;
        var nome = d.nome || slot.querySelector('h3').textContent;

        // carta ampliada: imagem real se existir, senão uma "carta" desenhada
        cardEl.innerHTML = '';
        if (d.imagem) {
            var img = document.createElement('img');
            img.src = d.imagem;
            img.alt = nome;
            cardEl.appendChild(img);
        } else {
            var face = document.createElement('div');
            face.className = 'card-preview-face';
            var t = document.createElement('strong');
            t.textContent = nome;
            var s = document.createElement('span');
            s.textContent = d.colecao || '';
            face.appendChild(t);
            face.appendChild(s);
            cardEl.appendChild(face);
        }

        field('nome').textContent = nome;
        field('colecao').textContent = d.colecao || '';

        var badge = field('raridade');
        badge.textContent = d.raridade || '';
        badge.hidden = !d.raridade;

        var lista = field('lista');
        lista.innerHTML = '';
        var rows = [];
        if (d.info) {
            d.info.split('|').forEach(function (pair) {
                var i = pair.indexOf(':');
                if (i > 0) rows.push([pair.slice(0, i).trim(), pair.slice(i + 1).trim()]);
            });
        }
        if (d.qtd) rows.push(['Quantidade', d.qtd + (d.qtd === '1' ? ' cópia' : ' cópias')]);
        rows.forEach(function (r) {
            var dt = document.createElement('dt');
            var dd = document.createElement('dd');
            dt.textContent = r[0];
            dd.textContent = r[1];
            lista.appendChild(dt);
            lista.appendChild(dd);
        });
    }

    //abrir / fechar
    var timer = null;
    var current = null;

    function open(slot) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            current = slot;
            fill(slot);
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-label', 'Carta ' + (slot.dataset.nome || ''));
        }, canHover ? OPEN_DELAY : 0);
    }

    function close() {
        clearTimeout(timer);
        current = null;
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
    }

    slots.forEach(function (slot) {
        slot.tabIndex = 0;
        slot.setAttribute('aria-haspopup', 'dialog');

        if (canHover) {
            slot.addEventListener('mouseenter', function () { open(slot); });
            slot.addEventListener('mouseleave', close);
        } else {
            // celular/tablet: não existe "hover", então abre no toque
            slot.addEventListener('click', function () { open(slot); });
        }
        slot.addEventListener('focus', function () { open(slot); });
        slot.addEventListener('blur', close);
    });

    // no toque o overlay precisa receber o clique para fechar
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && current) close();
    });
    // se rolar a página com o preview aberto, fecha
    window.addEventListener('scroll', function () { if (current && canHover) close(); }, { passive: true });
})();
