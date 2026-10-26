window.Cake = window.Cake || {};
(function () {
    var lastFocused = null;

    function ensureModal() {
        var $ = window.Cake.$;
        if ($('gameModal')) return;
        var div = document.createElement('div');
        div.id = 'gameModal';
        div.className = 'modal hidden';
        div.setAttribute('role', 'dialog');
        div.setAttribute('aria-modal', 'true');
        div.setAttribute('aria-labelledby', 'gameModalTitle');
        div.innerHTML =
            '<div class="modal-card">' +
                '<h2 id="gameModalTitle"></h2>' +
                '<div id="gameModalBody"></div>' +
                '<button type="button" class="modal-btn" onclick="Game.closeModal()">💗 知道了</button>' +
            '</div>';
        document.body.appendChild(div);
        div.addEventListener('click', function (e) {
            if (e.target === div) window.Game.closeModal();
        });
    }

    function showModal(title, bodyHTML) {
        ensureModal();
        var $ = window.Cake.$;
        lastFocused = document.activeElement;
        $('gameModalTitle').innerHTML = title;
        $('gameModalBody').innerHTML = bodyHTML;
        $('gameModal').classList.remove('hidden');
        document.body.classList.add('modal-open');
        var btn = $('gameModal').querySelector('.modal-btn');
        if (btn) setTimeout(function () { btn.focus(); }, 0);
    }

    function closeModal() {
        var $ = window.Cake.$;
        var m = $('gameModal');
        if (!m) return;
        m.classList.add('hidden');
        document.body.classList.remove('modal-open');
        if (lastFocused && typeof lastFocused.focus === 'function' && document.body.contains(lastFocused)) {
            lastFocused.focus();
        }
        lastFocused = null;
    }

    window.Cake.showModal = showModal;
    window.Cake.closeModal = closeModal;
})();