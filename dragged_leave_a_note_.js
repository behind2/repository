$(window).on('mousemove', 'body', function () {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
});