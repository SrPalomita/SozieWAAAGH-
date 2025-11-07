
function openWhatsApp() {
    const phone = "1234567890";
    const message = "Hola, me gustaría contactarte";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openFacebook() {
    window.open('https://facebook.com/tupagina', '_blank');
}

function openInstagram() {
    window.open('https://instagram.com/tuperfil', '_blank');
}
