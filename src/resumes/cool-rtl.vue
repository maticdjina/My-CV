<template>
  <main class="page">
    <article class="resume">
      <!-- Banner -->
      <header class="banner">
        <div class="banner__inner">
          <div class="banner__info">
            <p class="banner__eyebrow">Curriculum Vitae</p>
            <h1 class="banner__name">
              {{ person.name.first }} {{ person.name.middle }} {{ person.name.last }}
            </h1>
            <p class="banner__position">{{ person.position }}</p>
            <p class="banner__location">
              {{ lang.born }} {{ person.birth.year }} {{ lang.bornIn }} {{ person.birth.location }}
            </p>
          </div>
          <div class="avatar">
            <img :src="person.image" class="profile-img" />
          </div>
        </div>
        <div class="banner__rule" />
      </header>

      <div class="body">
        <!-- Sidebar -->
        <aside class="sidebar">
          <section class="section">
            <h2 class="section__head section__head--side">{{ lang.about }}</h2>
            <p class="muted">{{ person.about }}</p>
            <p class="muted muted--soft">{{ person.knowledge }}</p>
          </section>

          <section v-if="person.skills" class="section">
            <h2 class="section__head section__head--side">{{ lang.skills }}</h2>
            <div class="skills">
              <a v-for="(s, i) in person.skills" :key="i" :href="s.url" class="skill">
                {{ s.name }}
              </a>
            </div>
          </section>

          <section class="section">
            <h2 class="section__head section__head--side">{{ lang.contact }}</h2>
            <ul class="contact">
              <li><i class="ico material-icons">business</i><span>{{ person.contact.street }}</span></li>
              <li>
                <a :href="contactLinks.email"><i class="ico material-icons">mail</i><span>{{ person.contact.email }}</span></a>
              </li>
              <li><i class="ico material-icons">phone</i><span>{{ person.contact.phone }}</span></li>
              <li v-if="person.contact.website">
                <a :href="`https://${person.contact.website}`"><i class="ico fa fa-globe"></i><span>{{ person.contact.website }}</span></a>
              </li>
              <li v-if="person.contact.linkedin">
                <a :href="contactLinks.linkedin"><i class="ico fa fa-linkedin"></i><span>{{ person.contact.linkedin }}</span></a>
              </li>
              <li v-if="person.contact.github">
                <a :href="contactLinks.github"><i class="ico fa fa-github"></i><span>{{ person.contact.github }}</span></a>
              </li>
              <li v-if="person.contact.medium">
                <a :href="contactLinks.medium"><i class="ico fa fa-medium"></i><span>{{ person.contact.medium }}</span></a>
              </li>
            </ul>
          </section>
        </aside>

        <!-- Main -->
         
        <section class="main">
          <section v-if="person.projects" class="section">

<h2 class="section__head">
  <span class="badge"><i class="ico material-icons">code</i></span>{{ lang.projects }}
  <span class="hr" />
</h2>
<div class="grid grid--3">
  <a v-for="(p, i) in person.projects" :key="i" :href="p.url" class="card card--paper">
    <h3 class="card__title">{{ p.name }}</h3>
    <p class="card__platform">{{ p.platform }}</p>
    <p class="card__desc">{{ p.description }}</p>
  </a>
</div>
</section>
          <section class="section page-break">
            <h2 class="section__head">
              <span class="badge"><i class="ico material-icons">school</i></span>{{ lang.education }}
              <span class="hr" />
            </h2>
            <div class="grid grid--2">
              <div v-for="(ed, i) in person.education" :key="i" :href="ed.website" class="card">
                <h3 class="card__title">{{ ed.school }}</h3>
                <p class="card__sub">{{ ed.degree }}</p>
                <p class="card__date">{{ ed.timeperiod }}</p>
                <p v-if="ed.description" class="card__desc">{{ ed.description }}</p>
              </div>
            </div>
          </section>
         
     
           </section>
      </div>
    </article>
  </main>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'cool-rtl';

export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
/* === Tokens === */
.page {
  --paper: #f8f6f0;
  --ink: #51765c;
  --ink-soft: #213027;
  --ink-mute: #8593a3;
  --side: #51765c;
  --side-fg: #ecebe4;
  --side-mute: #9ca7b3;
  --side-rule: #213027;
  --gold: #c89a3a;
  --gold-soft: #f3e7c8;
  --rule: #e2e1da;

  direction: ltr;
  min-height: 100vh;
  height: auto;
  background: var(--paper);
  padding: 48px 16px;
  font-family: "Inter", system-ui, sans-serif;
  color: var(--ink);
}

@media (min-width: 768px) {
  .page { padding: 48px 40px; }
}

/* === Card === */
.resume {
  max-width: 1080px;
  margin: 0 auto;
  background: #fff;
  overflow: visible;
  box-shadow: 0 30px 80px -30px rgba(26, 35, 50, 0.25),
              0 2px 6px rgba(26, 35, 50, 0.04);
}

/* === Banner === */
.banner {
  position: relative;
  direction: ltr;
  background: var(--side);
  color: var(--side-fg);
  padding: 36px 44px;
}
.banner__inner {
  position: relative;
  min-height: 150px;
  padding-right: 170px;
  direction: ltr;
}
.banner__info {
  text-align: left;
  min-width: 0;
}
.banner__eyebrow {
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  margin: 0 0 12px;
}
.banner__name {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 48px;
  color: #fff;
  line-height: 1.1;
  margin: 0;
}
.banner__position {
  font-size: 18px;
  margin: 8px 0 6px;
  opacity: 0.9;
}
.banner__location {
  font-size: 13px;
  color: var(--side-mute);
  margin: 0;
}
.banner__rule {
  margin-top: 20px;
  height: 2px;
  width: 96px;
  background: var(--gold);
}
.avatar {
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  width: 150px;
  height: 150px;
}
.profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  image-rendering: auto;
  border-radius: 0;
  display: block;
}
@media print {
  .banner__inner {
    padding-right: 170px;
  }
  .avatar {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
  }
}

/* === Body grid === */
.body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  justify-content: center;
}
@media (min-width: 768px) {
  .body { grid-template-columns: 250px 1fr; }
  .banner { padding: 36px 44px; }
}

/* === Sidebar === */
.sidebar {
  background: var(--side);
  color: var(--side-fg);
  padding: 30px 22px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.sidebar .section__head { color: #fff; }
.sidebar a { color: var(--side-fg); text-decoration: none; }
.sidebar a:hover { color: var(--gold); }

.muted { font-size: 13px; line-height: 1.5; color: rgba(236, 235, 228, 0.85); margin: 0; }
.muted--soft { color: rgba(236, 235, 228, 0.7); margin-top: 6px; }

.skills {
  display: flex;
  flex-wrap: wrap;
}
.skill {
  font-size: 12px;
  padding: 6px 12px;
  border: 1px solid var(--side-rule);
  text-decoration: none;
  color: var(--side-fg);
  transition: all 0.2s;
  margin: 0 8px 8px 0;
}
.skill:hover { border-color: var(--gold); color: var(--gold); }

.contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 13px;
}
.contact li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.contact a {
  display: flex;
  align-items: center;
  gap: 10px;

  /*text-decoration: none;
  margin-bottom: 0; */
}
.contact span { color: rgba(236, 235, 228, 0.85); }

/* === Main === */
.main {
  padding: 34px 40px;
  display: block;
  flex-direction: column;
  gap: 28px;
}

/* === Section heading === */
.section { margin: 0; }
.section__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 12px;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink);
}
.section__head--side { font-size: 18px; }
.section__head .hr {
  flex: 1;
  height: 1px;
  background: var(--rule);
}
.sidebar .section__head .hr,
.section__head--side .hr { background: var(--side-rule); }

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  mid-width: 42px;
  border-radius: 50%;
  background: var(--gold-soft);
  color: var(--gold);
}
.badge .ico {
  width: 42px;
  height: 42px;
  min-width: 42px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 42px;
}
.ico { 
  width: 20px; 
  height: 20px;
  min-width: 20px;

 /* margin-right: 12px;*/
  line-height: 20px;
  display: inline-flex;
  /*vertical-align: middle;*/
  align-items: center;
  justify-content: center; 
  margin-right: 10px;
  font-size: 16px;
}

/* === Timeline === */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-left: 1px solid var(--rule);
  padding-left: 24px;
}
.tl-item {
  display: block;
  position: relative;
  text-decoration: none;
  color: inherit;
}
.tl-dot {
  position: absolute;
  left: -31px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 4px #fff;
}
.tl-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}
.tl-title {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 18px;
  margin: 0;
  color: var(--ink);
  transition: color 0.2s;
}
.tl-item:hover .tl-title { color: var(--gold); }
.tl-date {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-mute);
}
.tl-sub {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 4px 0 0;
}
.tl-sub strong { font-weight: 500; }
.tl-desc {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 8px 0 0;
}

/* === Cards grid === */
.grid { display: grid; gap: 16px; }
.grid--2 { grid-template-columns: 1fr; }
.grid--3 { grid-template-columns: 1fr; }
@media (min-width: 640px) {
  .grid--2 { grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid--3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  
}
}
.card {
  display: block;
  padding: 14px;
  border: 1px solid var(--rule);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s;
    page-break-inside: avoid;

}
.card:hover { border-color: var(--gold); cursor: default;}
.card--paper { background: var(--paper); padding: 16px; }

.card__title {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 16px;
  margin: 0;
  color: var(--ink);
}
.card:hover .card__title { color: var(--gold); }
.card__sub { font-size: 14px; color: var(--ink-soft); margin: 4px 0 0; }
.card__date {
  font-size: 11px;
  color: var(--ink-mute);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 8px 0 0;
}
.card__platform {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gold);
  margin: 4px 0 0;
}
.card__desc {
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.45;
  margin: 6px 0 0;
}

/* === Contributions === */
.contribs { display: flex; flex-direction: column; gap: 12px; }
.contrib { display: block; text-decoration: none; color: inherit; }
.contrib:hover .card__title { color: var(--gold); }
.contrib__url {
  font-size: 11px;
  color: var(--ink-mute);
  margin: 4px 0 0;
  word-break: break-all;
}
.page-break {
  margin-top: 20px; 
}
@media print {
  .page-break {
    page-break-before: always;
    page-break:page;
  }
}
</style>