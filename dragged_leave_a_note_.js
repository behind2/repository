$(window).on('mousemove', 'body', function () {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
});

/**
 *
 *  onmouseover         var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
 *  onmouseout          var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
 *
 */