# Cyber Shop — Loja Gamer

Projeto simples de vitrine para produtos afiliados da Amazon, feito com HTML, CSS e JavaScript puro.

Arquivos principais:
- `index.html` — estrutura do site
- `style.css` — estilos (variáveis CSS no topo)
- `script.js` — dados dos produtos, renderização e lógica do carrinho

Como trocar produtos
- Abra `script.js` e edite a array `PRODUCTS`.
- Cada item deve ter: `id`, `name`, `price`, `rating`, `img`, `link`.
- Para imagens locais, coloque-as em uma pasta `assets/` e use caminhos relativos.

Como trocar links afiliados
- No objeto de cada produto em `script.js`, altere o campo `link` para sua URL afiliada da Amazon.
- Os botões usam `target="_blank"` por padrão.

Como trocar imagens
- Use URLs externas (CDN/Unsplash) ou caminhos locais (ex.: `assets/produto.jpg`).
- Atualize `PRODUCTS[*].img` com o novo caminho.

Como trocar cores
- Abra `style.css` e altere as variáveis em `:root` (ex.: `--neon-blue`, `--neon-purple`, `--bg`).

Como adicionar produtos novos
- No final da array `PRODUCTS` em `script.js`, adicione outro objeto com os mesmos campos.
- Salve e recarregue a página — os cards são gerados dinamicamente.

Publicar online grátis
- GitHub Pages:
  1. `git init`
  2. `git add .`
  3. `git commit -m "Site loja gamer"`
  4. Crie repositório no GitHub e `git remote add origin <url>`
  5. `git push -u origin main`
  6. Ative GitHub Pages nas configurações do repositório.

- Netlify / Cloudflare Pages: conectar repositório ou arrastar a pasta do projeto.

Publicar localmente (commit inicial)
- Inicie um repositório git local, adicione e faça o commit inicial. Exemplo:
```bash
git init
git add .
git commit -m "Initial site: Cyber Shop"
git branch -M main
```

Para publicar no GitHub, crie um repositório remoto e execute:
```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

Personalizações e próximas melhorias sugeridas
- Integração com API real para preços atualizados.
- Otimização de imagens e lazy-loading.
- Implementar checkout com links compostos (carrinho único) via página intermediária.

Licença / Observação
- Este projeto é um template. Substitua os links `?tag=SEU_TAG` pelos seus códigos de afiliado.

