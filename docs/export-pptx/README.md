# Export PPTX

Ferramenta em `/docs/export-pptx` para gerar uma apresentação `.pptx` a partir de prompts/JSON.

## Front-end (entrada de prompts + exportação)

1. Abra `docs/export-pptx/index.html` no navegador.
2. Edite o JSON dos slides no campo de entrada.
3. Clique em:
   - **Exportar (pasta padrão)** para baixar no diretório padrão de downloads.
   - **Selecionar pasta** + **Exportar (pasta selecionada)** para gravar em uma pasta escolhida (quando suportado pelo navegador).

## Exemplo padrão salvo em pasta default do projeto

Gera um exemplo na pasta `docs/export-pptx/output`:

```bash
python3 -m pip install python-pptx
python3 docs/export-pptx/generate_example.py
```

Arquivo de saída:

`docs/export-pptx/output/desenvolvimento-assistido-por-ia-az1nn.pptx`
