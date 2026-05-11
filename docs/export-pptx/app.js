const slidesTextarea = document.getElementById('slidesJson');
const statusElement = document.getElementById('status');
const folderInfo = document.getElementById('folderInfo');
const fileNameInput = document.getElementById('fileName');
const exportSelectedButton = document.getElementById('exportSelected');
const BULLET_INDENT_SIZE = 18;

let directoryHandle = null;

const setStatus = (message, isError = false) => {
  statusElement.textContent = message;
  statusElement.style.color = isError ? '#b42318' : '#0a7a2f';
};

const createPresentation = (payload) => {
  const pptx = new window.PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Az1nn';
  pptx.company = 'Az1nn';
  pptx.subject = 'Desenvolvimento Assistido por IA';
  pptx.title = payload.title || 'Apresentação';

  const cover = pptx.addSlide();
  cover.background = { color: '0F172A' };
  cover.addText(payload.title || 'Sem título', {
    x: 0.8,
    y: 1.7,
    w: 12,
    h: 1.5,
    fontSize: 30,
    bold: true,
    color: 'FFFFFF',
  });
  cover.addText(payload.subtitle || '', {
    x: 0.8,
    y: 3.5,
    w: 12,
    h: 0.8,
    fontSize: 18,
    color: 'E2E8F0',
  });

  for (const slideData of payload.slides || []) {
    const slide = pptx.addSlide();
    slide.addText(slideData.title || 'Sem título', {
      x: 0.6,
      y: 0.5,
      w: 12,
      h: 0.7,
      fontSize: 26,
      bold: true,
      color: '0F172A',
    });

    const bullets = (slideData.bullets || []).map((text) => ({
      text,
      options: { bullet: { indent: BULLET_INDENT_SIZE } },
    }));
    slide.addText(bullets, {
      x: 0.9,
      y: 1.5,
      w: 11.8,
      h: 4.8,
      fontSize: 18,
      color: '1E293B',
      breakLine: true,
    });
  }

  return pptx;
};

const parseInput = () => {
  const payload = JSON.parse(slidesTextarea.value);
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.slides)) {
    throw new Error('JSON inválido: use o formato do exemplo.');
  }
  return payload;
};

const safeFileName = () => {
  const raw = (fileNameInput.value || '').trim() || 'apresentacao.pptx';
  return raw.toLowerCase().endsWith('.pptx') ? raw : `${raw}.pptx`;
};

document.getElementById('loadExample').addEventListener('click', async () => {
  const response = await fetch('./slides.example.json');
  const payload = await response.json();
  slidesTextarea.value = JSON.stringify(payload, null, 2);
  setStatus('Exemplo carregado.');
});

document.getElementById('downloadDefault').addEventListener('click', async () => {
  try {
    const payload = parseInput();
    const fileName = safeFileName();
    const pptx = createPresentation(payload);
    await pptx.writeFile({ fileName });
    setStatus(`Exportado para a pasta padrão de downloads como "${fileName}".`);
  } catch (error) {
    setStatus(`Falha ao exportar: ${error.message}`, true);
  }
});

document.getElementById('pickFolder').addEventListener('click', async () => {
  try {
    if (!window.showDirectoryPicker) {
      setStatus('Seu navegador não suporta seleção de pasta. Use exportação padrão.', true);
      return;
    }

    directoryHandle = await window.showDirectoryPicker();
    folderInfo.textContent = `Pasta selecionada: ${directoryHandle.name}`;
    exportSelectedButton.disabled = false;
    setStatus('Pasta de exportação selecionada com sucesso.');
  } catch (error) {
    setStatus(`Não foi possível selecionar pasta: ${error.message}`, true);
  }
});

document.getElementById('exportSelected').addEventListener('click', async () => {
  try {
    if (!directoryHandle) {
      setStatus('Selecione uma pasta primeiro.', true);
      return;
    }

    const payload = parseInput();
    const fileName = safeFileName();
    const pptx = createPresentation(payload);
    const blob = await pptx.write({ outputType: 'blob' });
    const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();

    setStatus(`Arquivo salvo na pasta selecionada como "${fileName}".`);
  } catch (error) {
    setStatus(`Falha ao exportar para pasta selecionada: ${error.message}`, true);
  }
});

fetch('./slides.example.json')
  .then((response) => response.json())
  .then((payload) => {
    slidesTextarea.value = JSON.stringify(payload, null, 2);
    setStatus('Exemplo padrão carregado. Clique em "Exportar (pasta padrão)".');
  })
  .catch(() => {
    setStatus('Não foi possível carregar o exemplo inicial.', true);
  });
