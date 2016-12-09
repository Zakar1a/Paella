function showLoadingBar() {
    $("#loading-wating-messages").attr("style", "display:block;");
}
function hideLoadingBar() {
    $("#loading-wating-messages").attr("style", "display:none;");
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'image/png';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}