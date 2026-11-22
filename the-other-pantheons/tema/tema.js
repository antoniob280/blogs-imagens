/* Código do tema do blog The Other Pantheons (gerar_tema_v1.3.py). Não editar: gerar de novo. */
(function () {
  var raiz = document.documentElement;
  // Modo claro/escuro
  var bt = document.getElementById('alternar-tema');
  if (bt) bt.addEventListener('click', function () {
    var novo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    raiz.setAttribute('data-theme', novo);
    try { localStorage.setItem('tema', novo); } catch (e) {}
  });
  // Busca
  var ab = document.getElementById('abrir-busca'), barra = document.getElementById('busca-barra');
  if (ab && barra) ab.addEventListener('click', function () {
    var abrir = barra.hasAttribute('hidden');
    if (abrir) { barra.removeAttribute('hidden'); document.getElementById('campo-busca').focus(); }
    else { barra.setAttribute('hidden', 'hidden'); }
    ab.setAttribute('aria-expanded', abrir ? 'true' : 'false');
  });
  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
  // Tempo de leitura e barra de progresso (só nos artigos)
  var corpo = document.getElementById('post-corpo'), tl = document.getElementById('tempo-leitura');
  if (corpo && tl) {
    var palavras = (corpo.innerText || '').split(/\s+/).filter(Boolean).length;
    var minutos = Math.max(1, Math.round(palavras / 230));
    tl.setAttribute('data-min', minutos);
    tl.textContent = minutos + ' min read';
    var barraP = document.getElementById('progresso');
    var atualizar = function () {
      var r = corpo.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      barraP.style.width = (p * 100) + '%';
    };
    window.addEventListener('scroll', atualizar, { passive: true });
    atualizar();
  }
  // Compartilhar
  var links = {
    x: function (u, t) { return 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t; },
    facebook: function (u) { return 'https://www.facebook.com/sharer/sharer.php?u=' + u; },
    reddit: function (u, t) { return 'https://www.reddit.com/submit?url=' + u + '&title=' + t; }
  };
  var botoes = document.querySelectorAll('.compartilhar button');
  for (var i = 0; i < botoes.length; i++) botoes[i].addEventListener('click', function () {
    var rede = this.getAttribute('data-rede'), url = location.href.split('#')[0], b = this;
    if (rede === 'copiar') {
      var ok = function () { b.textContent = uiAtual.copiado; setTimeout(function () { b.textContent = uiAtual.copiar; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok); else window.prompt('Copy this link:', url);
      return;
    }
    var t = (document.querySelector('.post-titulo') || {}).textContent || document.title;
    window.open(links[rede](encodeURIComponent(url), encodeURIComponent(t.trim())), '_blank', 'noopener,width=640,height=560');
  });
  // Idiomas (v1.5, dono 22/11/2026): o mesmo artigo em vários idiomas, um post por idioma. Os posts de um artigo
  // têm o rótulo do grupo ("art-005") e o do idioma ("lang-pt"); o botão lê as versões pelo feed do próprio blog.
  // Nada de redirecionar sozinho: só o botão e um aviso quando há versão no idioma do navegador do leitor.
  var BASE = 'en', P_IDIOMA = 'lang-', P_GRUPO = 'art-', LISTA_N = 9;
  var NOMES = { en: 'English', pt: 'Português', es: 'Español', de: 'Deutsch', fr: 'Français', hi: 'हिन्दी',
                ja: '日本語', id: 'Bahasa Indonesia', ar: 'العربية' };
  var TXT = {
    en: ['This article is also in English', 'Read', 'Language', 'Articles in English'],
    pt: ['Este artigo também está em português', 'Ler', 'Idioma', 'Artigos em português'],
    es: ['Este artículo también está en español', 'Leer', 'Idioma', 'Artículos en español'],
    de: ['Dieser Artikel ist auch auf Deutsch verfügbar', 'Lesen', 'Sprache', 'Artikel auf Deutsch'],
    fr: ['Cet article existe aussi en français', 'Lire', 'Langue', 'Articles en français'],
    hi: ['यह लेख हिन्दी में भी है', 'पढ़ें', 'भाषा', 'हिन्दी में लेख'],
    ja: ['この記事は日本語でも読めます', '読む', '言語', '日本語の記事'],
    id: ['Artikel ini juga tersedia dalam Bahasa Indonesia', 'Baca', 'Bahasa', 'Artikel dalam Bahasa Indonesia'],
    ar: ['هذا المقال متوفر أيضًا بالعربية', 'اقرأ', 'اللغة', 'مقالات بالعربية']
  };
  // v1.6 (dono, 22/11/2026: "tudo no idioma certo"): textos fixos do tema e abertura da página inicial no idioma
  // da página (artigo: o idioma dele; listas: o idioma escolhido). HERO vem de tema/textos_idiomas_vX.Y.toml do blog.
  var NOME_BLOG = 'The Other Pantheons';
  var UI = {
    en: {pular: 'Skip to content', artigos: 'Articles', about: 'About', contact: 'Contact', privacy: 'Privacy', privacy_longo: 'Privacy Policy', buscar: 'Search articles', buscar_btn: 'Search', comecar: 'Start reading', ver_youtube: 'Watch on YouTube', ultimos: 'Latest articles', assuntos: 'Topics:', compartilhar: 'Share:', copiar: 'Copy link', copiado: 'Copied', voltar: '\u2190 All articles', o_blog: 'The blog', todos: 'All articles', no_youtube: '{nome} on YouTube', min: '{n} min read'},
    pt: {pular: 'Pular para o conteúdo', artigos: 'Artigos', about: 'Sobre', contact: 'Contato', privacy: 'Privacidade', privacy_longo: 'Política de privacidade', buscar: 'Buscar artigos', buscar_btn: 'Buscar', comecar: 'Começar a ler', ver_youtube: 'Ver no YouTube', ultimos: 'Artigos mais recentes', assuntos: 'Assuntos:', compartilhar: 'Compartilhar:', copiar: 'Copiar link', copiado: 'Copiado', voltar: '\u2190 Todos os artigos', o_blog: 'O blog', todos: 'Todos os artigos', no_youtube: '{nome} no YouTube', min: '{n} min de leitura'},
    es: {pular: 'Saltar al contenido', artigos: 'Artículos', about: 'Acerca de', contact: 'Contacto', privacy: 'Privacidad', privacy_longo: 'Política de privacidad', buscar: 'Buscar artículos', buscar_btn: 'Buscar', comecar: 'Empezar a leer', ver_youtube: 'Ver en YouTube', ultimos: 'Últimos artículos', assuntos: 'Temas:', compartilhar: 'Compartir:', copiar: 'Copiar enlace', copiado: 'Copiado', voltar: '\u2190 Todos los artículos', o_blog: 'El blog', todos: 'Todos los artículos', no_youtube: '{nome} en YouTube', min: '{n} min de lectura'},
    de: {pular: 'Zum Inhalt springen', artigos: 'Artikel', about: 'Über uns', contact: 'Kontakt', privacy: 'Datenschutz', privacy_longo: 'Datenschutzerklärung', buscar: 'Artikel durchsuchen', buscar_btn: 'Suchen', comecar: 'Jetzt lesen', ver_youtube: 'Auf YouTube ansehen', ultimos: 'Neueste Artikel', assuntos: 'Themen:', compartilhar: 'Teilen:', copiar: 'Link kopieren', copiado: 'Kopiert', voltar: '\u2190 Alle Artikel', o_blog: 'Der Blog', todos: 'Alle Artikel', no_youtube: '{nome} auf YouTube', min: '{n} Min. Lesezeit'},
    fr: {pular: 'Aller au contenu', artigos: 'Articles', about: 'À propos', contact: 'Contact', privacy: 'Confidentialité', privacy_longo: 'Politique de confidentialité', buscar: 'Rechercher des articles', buscar_btn: 'Rechercher', comecar: 'Commencer la lecture', ver_youtube: 'Voir sur YouTube', ultimos: 'Derniers articles', assuntos: 'Sujets :', compartilhar: 'Partager :', copiar: 'Copier le lien', copiado: 'Copié', voltar: '\u2190 Tous les articles', o_blog: 'Le blog', todos: 'Tous les articles', no_youtube: '{nome} sur YouTube', min: '{n} min de lecture'},
    hi: {pular: 'सामग्री पर जाएँ', artigos: 'लेख', about: 'परिचय', contact: 'संपर्क', privacy: 'गोपनीयता', privacy_longo: 'गोपनीयता नीति', buscar: 'लेख खोजें', buscar_btn: 'खोजें', comecar: 'पढ़ना शुरू करें', ver_youtube: 'YouTube पर देखें', ultimos: 'नए लेख', assuntos: 'विषय:', compartilhar: 'शेयर करें:', copiar: 'लिंक कॉपी करें', copiado: 'कॉपी हो गया', voltar: '\u2190 सभी लेख', o_blog: 'ब्लॉग', todos: 'सभी लेख', no_youtube: 'YouTube पर {nome}', min: '{n} मिनट में पढ़ें'},
    ja: {pular: '本文へ移動', artigos: '記事', about: 'このブログについて', contact: 'お問い合わせ', privacy: 'プライバシー', privacy_longo: 'プライバシーポリシー', buscar: '記事を検索', buscar_btn: '検索', comecar: '読みはじめる', ver_youtube: 'YouTubeで見る', ultimos: '最新の記事', assuntos: 'トピック：', compartilhar: '共有：', copiar: 'リンクをコピー', copiado: 'コピーしました', voltar: '\u2190 すべての記事', o_blog: 'ブログ', todos: 'すべての記事', no_youtube: 'YouTubeの{nome}', min: '{n}分で読めます'},
    id: {pular: 'Langsung ke konten', artigos: 'Artikel', about: 'Tentang', contact: 'Kontak', privacy: 'Privasi', privacy_longo: 'Kebijakan Privasi', buscar: 'Cari artikel', buscar_btn: 'Cari', comecar: 'Mulai membaca', ver_youtube: 'Tonton di YouTube', ultimos: 'Artikel terbaru', assuntos: 'Topik:', compartilhar: 'Bagikan:', copiar: 'Salin tautan', copiado: 'Tersalin', voltar: '\u2190 Semua artikel', o_blog: 'Blog', todos: 'Semua artikel', no_youtube: '{nome} di YouTube', min: '{n} menit baca'},
    ar: {pular: 'انتقل إلى المحتوى', artigos: 'المقالات', about: 'من نحن', contact: 'اتصل بنا', privacy: 'الخصوصية', privacy_longo: 'سياسة الخصوصية', buscar: 'ابحث في المقالات', buscar_btn: 'بحث', comecar: 'ابدأ القراءة', ver_youtube: 'شاهد على يوتيوب', ultimos: 'أحدث المقالات', assuntos: 'المواضيع:', compartilhar: 'شارك:', copiar: 'نسخ الرابط', copiado: 'تم النسخ', voltar: 'كل المقالات \u2192', o_blog: 'المدونة', todos: 'كل المقالات', no_youtube: '{nome} على يوتيوب', min: 'قراءة في {n} دقائق'}
  };
  var HERO = {"pt":{"kicker":"Mitos do mundo","titulo":"Deuses, monstros e submundos além do Olimpo.","subtitulo":"Mitos japoneses, astecas, celtas e outros, contados a partir das fontes de cada cultura.","rodape":"Mitos além do Olimpo: deuses, monstros e submundos japoneses, astecas, celtas e outros, a partir das fontes originais. Blog do canal The Other Pantheons no YouTube.","creditos":"Imagens de acervos abertos de museus e outras fontes, com crédito em cada artigo.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_pt_v1.0.jpg"},"es":{"kicker":"Mitos del mundo","titulo":"Dioses, monstruos e inframundos más allá del Olimpo.","subtitulo":"Mitos japoneses, aztecas, celtas y otros, contados desde las fuentes de cada cultura.","rodape":"Mitos más allá del Olimpo: dioses, monstruos e inframundos japoneses, aztecas, celtas y otros, desde las fuentes originales. Blog del canal de YouTube The Other Pantheons.","creditos":"Imágenes de colecciones abiertas de museos y otras fuentes, con crédito en cada artículo.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_es_v1.0.jpg"},"de":{"kicker":"Mythen der Welt","titulo":"Götter, Monster und Unterwelten jenseits des Olymp.","subtitulo":"Japanische, aztekische, keltische und andere Mythen, erzählt aus den Quellen der jeweiligen Kultur.","rodape":"Mythen jenseits des Olymp: japanische, aztekische, keltische und andere Götter, Monster und Unterwelten, aus den Originalquellen. Begleitblog zum YouTube-Kanal The Other Pantheons.","creditos":"Bilder aus offenen Museumssammlungen und anderen Quellen, mit Nachweis in jedem Artikel.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_de_v1.0.jpg"},"fr":{"kicker":"Mythes du monde","titulo":"Dieux, monstres et enfers au-delà de l'Olympe.","subtitulo":"Mythes japonais, aztèques, celtes et autres, racontés à partir des sources de chaque culture.","rodape":"Des mythes au-delà de l'Olympe : dieux, monstres et enfers japonais, aztèques, celtes et autres, d'après les sources originales. Le blog de la chaîne YouTube The Other Pantheons.","creditos":"Images issues des collections ouvertes de musées et d'autres sources, créditées dans chaque article.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_fr_v1.0.jpg"},"hi":{"kicker":"दुनिया के मिथक","titulo":"ओलिंपस से आगे के देवता, राक्षस और पाताल लोक।","subtitulo":"जापानी, एज़्टेक, केल्टिक और दूसरे मिथक, हर संस्कृति के अपने स्रोतों से।","rodape":"ओलिंपस से आगे के मिथक: जापानी, एज़्टेक, केल्टिक और दूसरे देवता, राक्षस और पाताल लोक, मूल स्रोतों से। The Other Pantheons YouTube चैनल का ब्लॉग।","creditos":"संग्रहालयों के खुले संग्रहों और अन्य स्रोतों की तस्वीरें, हर लेख में श्रेय के साथ।","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_hi_v1.0.jpg"},"ja":{"kicker":"世界の神話","titulo":"オリュンポスの外の神々、怪物、冥界。","subtitulo":"日本、アステカ、ケルトなどの神話を、それぞれの文化の原典から。","rodape":"オリュンポスの外の神話。日本、アステカ、ケルトなどの神々、怪物、冥界を原典から紹介します。YouTubeチャンネル「The Other Pantheons」のブログです。","creditos":"画像は美術館のオープンコレクションなどの提供。出典は各記事に記載しています。","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_ja_v1.0.jpg"},"id":{"kicker":"Mitos dunia","titulo":"Dewa, monster, dan dunia bawah di luar Olimpus.","subtitulo":"Mitos Jepang, Aztek, Kelt, dan lainnya, diceritakan dari sumber masing-masing budaya.","rodape":"Mitos di luar Olimpus: dewa, monster, dan dunia bawah Jepang, Aztek, Kelt, dan lainnya, dari sumber aslinya. Blog pendamping kanal YouTube The Other Pantheons.","creditos":"Gambar dari koleksi terbuka museum dan sumber lain, dengan kredit di setiap artikel.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_id_v1.0.jpg"},"ar":{"kicker":"أساطير العالم","titulo":"آلهة ووحوش وعوالم سفلية خارج الأوليمب.","subtitulo":"أساطير يابانية وأزتيكية وكلتية وغيرها، مرويةً من مصادر كل ثقافة.","rodape":"أساطير خارج الأوليمب: آلهة ووحوش وعوالم سفلية يابانية وأزتيكية وكلتية وغيرها، من المصادر الأصلية. مدونة قناة The Other Pantheons على يوتيوب.","creditos":"الصور من المجموعات المفتوحة للمتاحف ومصادر أخرى، مع ذكر المصدر في كل مقال.","imagem_hero":"https://cdn.jsdelivr.net/gh/antoniob280/blogs-imagens@main/the-other-pantheons/marca/cabecalho_ar_v1.0.jpg"}};
  var uiAtual = UI[BASE] || UI.en;
  raiz.setAttribute('lang', BASE);  // v1.8: idioma do blog, mesmo com a configuração do Blogger em outro idioma
  var aplicarIdioma = function (l) {
    if (l) raiz.setAttribute('lang', l);  // v1.8: a página inteira no idioma aberto
    if (!UI[l] || l === BASE) return;
    uiAtual = UI[l];
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute('data-i18n');
      if (uiAtual[k]) { els[i].textContent = uiAtual[k].replace('{nome}', NOME_BLOG); els[i].setAttribute('lang', l); }
    }
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) {
      var kp = phs[j].getAttribute('data-i18n-ph');
      if (uiAtual[kp]) { phs[j].setAttribute('placeholder', uiAtual[kp]); phs[j].setAttribute('aria-label', uiAtual[kp]); }
    }
    if (tl && corpo && l === 'ja') tl.setAttribute('data-min', Math.max(1, Math.round((corpo.innerText || '').length / 500)));
    if (tl && tl.getAttribute('data-min')) tl.textContent = uiAtual.min.replace('{n}', tl.getAttribute('data-min'));
    var h = HERO[l];
    if (!h) return;
    var pares = [['hero-kicker', 'kicker'], ['hero-titulo', 'titulo'], ['hero-sub', 'subtitulo'],
                 ['rodape-texto', 'rodape'], ['rodape-creditos', 'creditos']];
    pares.forEach(function (p) {
      var el = document.getElementById(p[0]);
      if (el && h[p[1]]) { el.textContent = h[p[1]]; el.setAttribute('lang', l); if (l === 'ar') el.setAttribute('dir', 'rtl'); }
    });
    var hero = document.querySelector('.hero');
    if (hero && h.imagem_hero) hero.style.backgroundImage = "url('" + h.imagem_hero + "')";
    if (hero && l === 'ar') { var hi_ = hero.querySelector('.hero-in'); if (hi_) hi_.setAttribute('dir', 'rtl'); }
  };
  var guardado = function () { try { return localStorage.getItem('idioma'); } catch (e) { return null; } };
  var guardar = function (l) { try { localStorage.setItem('idioma', l); } catch (e) {} };
  var navegador = function () {
    var ls = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < ls.length; i++) { var c = (ls[i] || '').slice(0, 2).toLowerCase(); if (NOMES[c]) return c; }
    return null;
  };
  var preferido = function (disp) {  // escolha do leitor, depois o navegador, depois o idioma do blog
    var g = guardado(), n = navegador();
    if (g && disp[g]) return g;
    if (n && disp[n]) return n;
    return BASE;
  };
  var feed = function (rotulo, n, ok) {
    var u = '/feeds/posts/summary' + (rotulo ? '/-/' + encodeURIComponent(rotulo) : '') + '?alt=json&max-results=' + n;
    var x = new XMLHttpRequest();
    x.open('GET', u);
    x.onload = function () { try { ok(JSON.parse(x.responseText).feed || {}); } catch (e) {} };
    x.send();
  };
  var termos = function (cats) { var o = []; for (var i = 0; cats && i < cats.length; i++) o.push(cats[i].term); return o; };
  var idiomaDe = function (rots) {
    for (var i = 0; i < rots.length; i++) if (rots[i].indexOf(P_IDIOMA) === 0) return rots[i].slice(P_IDIOMA.length);
    return BASE;  // post antigo sem o rótulo = idioma do blog
  };
  var linkDe = function (e) {
    for (var i = 0; i < (e.link || []).length; i++) if (e.link[i].rel === 'alternate') return e.link[i].href;
    return '';
  };
  // esconde os rótulos técnicos (lang-xx, art-NNN) da lista de assuntos do post
  var chips = document.querySelectorAll('.post-rotulos .chip');
  for (var c = 0; c < chips.length; c++) {
    var tx = chips[c].textContent.trim();
    if (tx.indexOf(P_IDIOMA) === 0 || tx.indexOf(P_GRUPO) === 0) chips[c].style.display = 'none';
  }
  var art = document.querySelector('.post-corpo .art-blog[data-grupo]');
  if (art) {  // página de um artigo
    var lingua = art.getAttribute('data-lang') || BASE, grupo = art.getAttribute('data-grupo');
    raiz.setAttribute('lang', art.getAttribute('lang') || lingua);
    aplicarIdioma(lingua);
    var post = document.querySelector('article.post');
    if (art.getAttribute('dir') === 'rtl' && post) post.setAttribute('dir', 'rtl');
    feed(grupo, 25, function (f) {
      var versoes = {}, n = 0;
      (f.entry || []).forEach(function (e) {
        var l = idiomaDe(termos(e.category)), u = linkDe(e);
        if (u && !versoes[l]) { versoes[l] = u; n++; }
      });
      var orig = art.getAttribute('data-original');
      if (orig && !versoes[BASE]) { versoes[BASE] = orig; n++; }
      versoes[lingua] = location.href.split(/[?#]/)[0];
      if (n < 2 && Object.keys(versoes).length < 2) return;
      var head = document.head;
      Object.keys(versoes).forEach(function (l) {
        var k = document.createElement('link');
        k.rel = 'alternate'; k.hreflang = l; k.href = versoes[l]; head.appendChild(k);
      });
      if (versoes[BASE]) {
        var xd = document.createElement('link');
        xd.rel = 'alternate'; xd.hreflang = 'x-default'; xd.href = versoes[BASE]; head.appendChild(xd);
      }
      var caixa = document.getElementById('idiomas');
      if (caixa) {
        var t = TXT[lingua] || TXT.en, html = '<span class="rotulo-idiomas">' + t[2] + ':</span>';
        Object.keys(NOMES).forEach(function (l) {
          if (!versoes[l]) return;
          html += l === lingua ? '<span class="atual" lang="' + l + '">' + NOMES[l] + '</span>'
                               : '<a href="' + versoes[l] + '" hreflang="' + l + '" lang="' + l + '" data-idioma="' + l + '">' + NOMES[l] + '</a>';
        });
        caixa.innerHTML = html;
        caixa.removeAttribute('hidden');
        caixa.addEventListener('click', function (ev) {
          var a = ev.target.closest ? ev.target.closest('a[data-idioma]') : null;
          if (a) guardar(a.getAttribute('data-idioma'));
        });
      }
      var pref = preferido(versoes), aviso = document.getElementById('idioma-aviso');
      var fechado = false;
      try { fechado = sessionStorage.getItem('aviso-idioma') === '1'; } catch (e) {}
      if (aviso && pref !== lingua && versoes[pref] && !fechado && guardado() !== lingua) {
        var tp = TXT[pref] || TXT.en;
        aviso.setAttribute('lang', pref);
        if (pref === 'ar') aviso.setAttribute('dir', 'rtl');
        aviso.innerHTML = '<span>' + tp[0] + '. <a href="' + versoes[pref] + '" data-idioma="' + pref + '">' + tp[1]
          + ' &#8594;</a></span><button type="button" aria-label="Close">&#215;</button>';
        aviso.removeAttribute('hidden');
        aviso.querySelector('a').addEventListener('click', function () { guardar(pref); });
        aviso.querySelector('button').addEventListener('click', function () {
          aviso.setAttribute('hidden', 'hidden');
          guardar(lingua);
          try { sessionStorage.setItem('aviso-idioma', '1'); } catch (e) {}
        });
      }
    });
  }
  var grade = document.querySelector('.lista .grade');
  if (grade) {  // listas (início, rótulo, busca): só os artigos de um idioma
    var m = location.pathname.match(/\/search\/label\/([^/?#]+)/);
    var rotuloPag = m ? decodeURIComponent(m[1]) : '';
    var naPagina = rotuloPag.indexOf(P_IDIOMA) === 0 ? rotuloPag.slice(P_IDIOMA.length) : null;
    feed('', 0, function (f) {
      var disp = {};
      termos(f.category).forEach(function (t) { if (t.indexOf(P_IDIOMA) === 0) disp[t.slice(P_IDIOMA.length)] = 1; });
      disp[BASE] = 1;
      var ver = naPagina || preferido(disp);
      aplicarIdioma(ver);
      if (!naPagina && location.search.indexOf('q=') < 0) {
        var cartoes = grade.querySelectorAll('.cartao'), escondidos = 0;
        for (var i = 0; i < cartoes.length; i++) {
          var rs = [], ds = cartoes[i].querySelectorAll('.rot-dado');
          for (var j = 0; j < ds.length; j++) rs.push(ds[j].textContent.trim());
          if (idiomaDe(rs) !== ver) { cartoes[i].style.display = 'none'; escondidos++; }
        }
        // v1.7: página do idioma = 1 artigo em destaque + LISTA_N embaixo (linhas de 3), montada pelo feed do blog.
        // No idioma do blog vale também o post antigo sem o rótulo lang-xx (antes, a lista saía só com 3 artigos).
        var visiveis = cartoes.length - escondidos;
        if ((escondidos || visiveis < 1 + LISTA_N) && Object.keys(disp).length > 1 && disp[ver]) {
          feed(ver === BASE ? '' : P_IDIOMA + ver, ver === BASE ? 60 : 1 + LISTA_N, function (f2) {
            var html = '', usados = 0;
            (f2.entry || []).forEach(function (e) {
              if (usados >= 1 + LISTA_N || idiomaDe(termos(e.category)) !== ver) return;
              usados++;
              var u = linkDe(e), tit = (e.title || {}).$t || '', img = (e.media$thumbnail || {}).url || '';
              img = img.replace(/\/s\d+(-c)?\//, '/w640/').replace(/=s\d+(-c)?$/, '=w640');
              var dia = ((e.published || {}).$t || '').slice(0, 10);
              try { dia = new Date(dia + 'T12:00:00').toLocaleDateString(ver, { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e_) {}
              var div = document.createElement('div'); div.textContent = tit; tit = div.innerHTML;
              html += '<article class="cartao" lang="' + ver + '"><a aria-hidden="true" class="cartao-img" href="' + u + '" tabindex="-1">'
                + (img ? '<img alt="" loading="lazy" src="' + img + '"/>' : '<span class="cartao-sem-img"></span>')
                + '</a><div class="cartao-txt"><h2 class="cartao-titulo"><a href="' + u + '">' + tit + '</a></h2>'
                + '<div class="cartao-data">' + dia + '</div></div></article>';
            });
            if (html && usados >= visiveis) grade.innerHTML = html;
          });
        }
      }
      var bar = document.getElementById('idiomas-lista');
      if (bar && Object.keys(disp).length > 1) {
        var h = '';
        Object.keys(NOMES).forEach(function (l) {
          if (!disp[l]) return;
          var url = l === BASE ? '/' : '/search/label/' + P_IDIOMA + l;
          h += '<a href="' + url + '" lang="' + l + '" data-idioma="' + l + '"' + (l === ver ? ' class="atual"' : '') + '>' + NOMES[l] + '</a>';
        });
        bar.innerHTML = h;
        bar.removeAttribute('hidden');
        bar.addEventListener('click', function (ev) {
          var a = ev.target.closest ? ev.target.closest('a[data-idioma]') : null;
          if (a) guardar(a.getAttribute('data-idioma'));
        });
      }
    });
  }
})();
