const colorPicker = document.getElementById('colorPicker');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const formatSelect = document.getElementById('format');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');
const downloadLink = document.getElementById('downloadLink');

function generateImage() {
    const width = parseInt(widthInput.value) || 500;
    const height = parseInt(heightInput.value) || 500;
    const color = colorPicker.value;
    const format = formatSelect.value;

    // Canvas設定
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 色を塗りつぶす
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // プレビュー表示
    const img = new Image();
    img.src = canvas.toDataURL(`image/${format}`);
    img.style.maxWidth = '100%';
    preview.innerHTML = '';
    preview.appendChild(img);

    // ダウンロードリンク
    downloadLink.href = canvas.toDataURL(`image/${format}`);
    downloadLink.download = `color_image.${format}`;
    downloadLink.style.display = 'block';
    downloadLink.textContent = `画像をダウンロード (${format.toUpperCase()})`;
}

// Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}
