import QRCode from 'qrcode'

const generateQR = async text => {
    try {
        let url = await QRCode.toDataURL(text)
        console.log(url)
    } catch (err) {
        console.error(err)
    }
}

generateQR('https://www.google.com').then(r => console.log(r))