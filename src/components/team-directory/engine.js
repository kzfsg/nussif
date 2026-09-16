export function mountDirectory(scope, options = {}) {
  const root = options.data;
  const $ = (selector) => scope.querySelector(selector);
  const all = (selector) => scope.querySelectorAll(selector);
  const controller = new AbortController();

  const on = (target, event, callback) =>
    target.addEventListener(event, callback, {
      signal: controller.signal,
    });

  const activeElement = () => scope.activeElement || document.activeElement;
  const isEmbedded = Boolean(options.embedded);

  let animationFrame = 0;
  let disposed = false;
  let sceneVisible = true;
  let savedBodyOverflow = '';

  function scrollDirectory() {
    if (isEmbedded) {
      scope.host.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  const escapeHTML = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character],
    );

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const teamDefinitions = [
    {
      key: 'leadership',
      name: 'Fund Leadership',
      short: 'Leadership',
      category: 'FUND LEADERSHIP',
      caption: 'Co-Heads',
      description: 'The fund’s Co-Heads.',
      children: root.children.filter((node) => node.type === 'person'),
    },
    ...['equities', 'macro', 'commod', 'syst', 'risk', 'ext', 'gr'].map(
      (key) => {
        const node = root.children.find((item) => item.key === key);

        const names = {
          equities: 'Equities',
          macro: 'Global Macro',
          commod: 'Commodities',
          syst: 'Systematic',
          risk: 'Risk',
          ext: 'Externals',
          gr: 'Global Research',
        };

        const categories = {
          equities: 'INVESTMENT TEAM',
          macro: 'INVESTMENT TEAM',
          commod: 'INVESTMENT TEAM',
          syst: 'INVESTMENT TEAM',
          risk: 'RISK MANAGEMENT',
          ext: 'FUND DEVELOPMENT & BRAND',
          gr: 'AUTONOMOUS RESEARCH UNIT',
        };

        const descriptions = {
          equities: 'Portfolio managers and their analyst teams.',
          macro: 'Portfolio managers and their analyst teams.',
          commod: 'Portfolio manager and analyst team.',
          syst: 'Portfolio manager and analyst team.',
          risk: 'Head of Risk and analyst team.',
          ext: 'Fund development, marketing and brand.',
          gr: 'An autonomous unit reporting directly to the Co-Heads.',
        };

        const name = options.names?.[key] || names[key];

        return {
          key,
          name,
          short: name,
          category: options.categories?.[key] || categories[key],
          description: descriptions[key],
          children: node.children,
        };
      },
    ),
  ];

  const teams = teamDefinitions.map((team, index) => ({
    ...team,
    index: index + 1,
    members: [],
    description:
      options.descriptions?.[team.key] || team.description,
  }));

  const byId = new Map();

  function walk(nodes, team, parent = null) {
    nodes.forEach((node) => {
      byId.set(node.id, {
        ...node,
        team,
        parent,
      });
      team.members.push(node);
      walk(node.children, team, node);
    });
  }

  teams.forEach((team) => walk(team.children, team));

  const uniquePeople = new Set(
    teams.flatMap((team) =>
      team.members.map((node) =>
        (node.email || node.name).toLowerCase(),
      ),
    ),
  ).size;

  $('#member-total').textContent = uniquePeople;
  $('#atlas-hover-label').textContent =
    `${uniquePeople} PEOPLE · 08 TEAMS`;

  const state = {
    team: null,
    person: null,
    angle: 0,
    lastFrame: 0,
    profileTrigger: null,
    hover: null,
    pointerX: 0,
    pointerY: 0,
    smoothX: 0,
    smoothY: 0,
  };

  const arrow = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <path d="m14 5-7 7 7 7M7 12h14"></path>
    </svg>
  `;

  const num = (number) => String(number).padStart(2, '0');

  const initials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .filter((_, index, items) =>
        index === 0 || index === items.length - 1,
      )
      .map((part) => part[0])
      .join('')
      .toUpperCase();

  const role = (value) =>
    value === 'PM' ? 'Portfolio Manager' : value;

  function academic(person) {
    const year = person.year
      ? /^\d+$/.test(person.year)
        ? `Year ${person.year}`
        : person.year
      : '';

    return [
      year,
      person.fac && person.fac !== person.year
        ? person.fac
        : '',
    ]
      .filter(Boolean)
      .join(' · ');
  }

  function leadCaption(team) {
    if (team.key === 'leadership') return 'Co-Heads';
    if (team.key === 'gr') return 'Autonomous unit';
    if (team.key === 'ext') return 'Development & brand';

    if (team.key === 'risk') {
      return team.name === 'Developers'
        ? 'Operations & software'
        : 'Risk management';
    }

    return `${team.children.length} PM${
      team.children.length > 1 ? 's' : ''
    }`;
  }

  function signature(team) {
    const index = team.index;

    return `
      <svg viewBox="0 0 240 140" fill="none" aria-hidden="true">
        ${Array.from({ length: 18 }, (_, strand) => {
          const y = 10 + strand * 6;

          return `
            <path
              d="M-20 ${y} C ${60 + index * 4} ${
                y - 50 + strand * 0.8
              }, ${110 - index * 3} ${170 - y}, 260 ${y - 20}"
              stroke="currentColor"
              stroke-width=".55"
            ></path>
          `;
        }).join('')}
      </svg>
    `;
  }

  $('#team-nav').innerHTML = teams
    .map(
      (team, index) => `
        ${
          index === 1 || index === 5
            ? '<div class="nav-divider"></div>'
            : ''
        }
        <button
          class="nav-team"
          data-team="${team.key}"
          aria-controls="team-view"
          aria-expanded="false"
        >
          <span class="nav-num">${num(team.index)}</span>
          <span class="nav-name">${team.short}</span>
          <span class="nav-count">${num(team.members.length)}</span>
        </button>
      `,
    )
    .join('');

  $('#team-cards').innerHTML = teams
    .map(
      (team) => `
        <button
          class="atlas-card"
          data-team="${team.key}"
          aria-label="Explore ${team.name}, ${team.members.length} members"
        >
          <span class="atlas-card-face">
            <span class="card-signature">${signature(team)}</span>

            <span class="atlas-card-top">
              <span class="card-num">${num(team.index)} / NUSSIF</span>
              <span class="card-arrow">↗</span>
            </span>

            <span class="card-name">${team.name}</span>

            <span class="card-bottom">
              <span class="card-caption">
                ${num(team.members.length)}
                <span>members</span>
              </span>
              <span class="card-role">${leadCaption(team)}</span>
            </span>

            <span class="card-reveal">
              ${
                team.key === 'gr'
                  ? 'Reports to the Co-Heads'
                  : team.children
                      .map((person) => escapeHTML(person.name))
                      .join(' · ')
              }
            </span>
          </span>
        </button>
      `,
    )
    .join('');

  const cards = [...all('.atlas-card')];

  function personButton(
    person,
    { lead = false, showRole = false } = {},
  ) {
    return `
      <button
        class="person ${lead ? 'person-lead' : ''}"
        data-person="${person.id}"
        aria-haspopup="dialog"
        aria-label="View ${escapeHTML(person.name)}, ${escapeHTML(
          role(person.role),
        )}"
      >
        <span class="avatar" aria-hidden="true">
          ${initials(person.name)}
        </span>

        <span class="person-main">
          <span class="person-name">${escapeHTML(person.name)}</span>

          ${
            lead || showRole
              ? `<span class="person-role">${escapeHTML(
                  role(person.role),
                )}</span>`
              : ''
          }

          <span class="person-fac">
            ${escapeHTML(academic(person))}
          </span>
        </span>

        <span class="person-arrow" aria-hidden="true">↗</span>
      </button>
    `;
  }

  function descendantCount(person) {
    return person.children.reduce(
      (count, child) =>
        count + 1 + descendantCount(child),
      0,
    );
  }

  function standardPod(person, team, index) {
    let podLabel;

    if (team.children.length > 1) {
      podLabel = `PORTFOLIO ${num(index + 1)}`;
    } else if (team.key === 'risk') {
      podLabel =
        team.name === 'Developers'
          ? 'DEVELOPERS TEAM'
          : 'RISK TEAM';
    } else {
      podLabel = 'PORTFOLIO TEAM';
    }

    return `
      <section
        class="pod"
        aria-label="${escapeHTML(person.name)}’s team"
      >
        <div class="pod-header">
          <span class="pod-label">${podLabel}</span>
          <span class="pod-size">
            ${1 + descendantCount(person)} members
          </span>
        </div>

        ${personButton(person, { lead: true })}

        <div class="analyst-section">
          <div class="analyst-label">
            <span>ANALYSTS</span>
            <span>${num(person.children.length)}</span>
          </div>

          <div class="analyst-list">
            ${person.children
              .map((child) => personButton(child))
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  function externalPod(team) {
    const head = team.children[0];

    return `
      <section class="pod">
        <div class="pod-header">
          <span class="pod-label">EXTERNALS TEAM</span>
          <span class="pod-size">${team.members.length} members</span>
        </div>

        ${personButton(head, { lead: true })}

        <div class="analyst-section">
          <div class="analyst-label">
            <span>DIRECTORS & ANALYSTS</span>
            <span>${num(team.members.length - 1)}</span>
          </div>

          <div class="support-grid">
            ${head.children
              .map(
                (person) => `
                  <section
                    class="report-group"
                    aria-label="${escapeHTML(person.name)}’s team"
                  >
                    <div class="report-group-label">
                      ${
                        person.name === 'Rui Wen'
                          ? 'FUND DEVELOPMENT'
                          : 'MARKETING & BRAND'
                      }
                    </div>

                    ${personButton(person, { showRole: true })}

                    ${
                      person.children.length
                        ? `
                          <div class="report-members">
                            ${person.children
                              .map((child) =>
                                personButton(child, {
                                  showRole: true,
                                }),
                              )
                              .join('')}
                          </div>
                        `
                        : ''
                    }
                  </section>
                `,
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  function showTeam(
    key,
    { toggle = true, focus = true } = {},
  ) {
    const team = teams.find((item) => item.key === key);
    if (!team) return;

    hideSearch();

    if (state.team?.key === key && toggle) {
      closeTeam();
      return;
    }

    closeProfile({ restore: false });
    state.team = team;
    state.person = null;

    $('#overview').hidden = true;
    $('#team-view').hidden = false;

    all('.nav-team').forEach((button) => {
      const active = button.dataset.team === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-expanded', String(active));
    });

    const special = ['leadership', 'gr'].includes(key);
    const leads = special ? [] : team.children;

    const countLabels =
      key === 'leadership'
        ? [{ n: 2, label: 'CO-HEADS' }]
        : key === 'gr'
          ? [{ n: team.members.length, label: 'ANALYSTS' }]
          : [
              {
                n: leads.length,
                label:
                  leads[0]?.role === 'PM'
                    ? leads.length === 1
                      ? 'PORTFOLIO MANAGER'
                      : 'PORTFOLIO MANAGERS'
                    : 'TEAM HEAD',
              },
              {
                n: team.members.length - leads.length,
                label:
                  key === 'ext'
                    ? 'DIRECTORS & ANALYSTS'
                    : 'ANALYSTS',
              },
            ];

    let roster = '';

    if (key === 'leadership') {
      roster = `
        <div class="leadership-grid">
          ${team.children
            .map((person) =>
              personButton(person, { lead: true }),
            )
            .join('')}
        </div>
      `;
    } else if (key === 'gr') {
      roster = `
        <div class="pod">
          <div class="pod-header">
            <span class="pod-label">RESEARCH TEAM</span>
            <span class="pod-size">
              Reports to the Co-Heads
            </span>
          </div>

          <div class="support-grid">
            ${team.children
              .map((person) =>
                personButton(person, { showRole: true }),
              )
              .join('')}
          </div>
        </div>
      `;
    } else if (key === 'ext') {
      roster = externalPod(team);
    } else {
      roster = `
        <div class="pod-grid ${
          team.children.length === 1 ? 'single' : ''
        }">
          ${team.children
            .map((person, index) =>
              standardPod(person, team, index),
            )
            .join('')}
        </div>
      `;
    }

    $('#team-view').innerHTML = `
      <div class="team-topline">
        <button class="back-button" data-action="close-team">
          ${arrow}
          All teams
        </button>

        <span class="team-code">
          ${num(team.index)} / NUSSIF · AY26/27
        </span>
      </div>

      <div class="team-hero">
        <div class="team-watermark">${signature(team)}</div>
        <span class="chapter-number" aria-hidden="true">
          ${num(team.index)}
        </span>

        <div class="team-title-group">
          <p class="eyebrow">${team.category}</p>

          <${isEmbedded ? 'h2' : 'h1'}
            id="team-title"
            tabindex="-1"
          >
            ${team.name}
          </${isEmbedded ? 'h2' : 'h1'}>

          <p class="team-subtitle">
            ${escapeHTML(team.description)}
          </p>
        </div>

        <div class="team-stats">
          ${countLabels
            .map(
              (count) => `
                <div class="team-stat">
                  <strong>${num(count.n)}</strong>
                  <span>${count.label}</span>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>

      <div class="roster-heading">
        <span class="eyebrow">
          ${special ? 'THE TEAM' : 'TEAM STRUCTURE'}
        </span>
        <span>Select a member to view their profile</span>
      </div>

      ${roster}

      <p class="team-footnote">
        ${arrow}
        ${
          key === 'leadership'
            ? 'Fund leadership'
            : 'Reports to the Co-Heads'
        }
        <span aria-hidden="true">·</span>
        AY26/27 Semester 1
      </p>
    `;

    $('#announcer').textContent =
      `${team.name} open. All ${team.members.length} team members are shown.`;

    if (focus) {
      $('#team-title').focus({ preventScroll: true });
      scrollDirectory();
    }
  }

  function closeTeam() {
    hideSearch();
    closeProfile({ restore: false });

    const prior = state.team;
    state.team = null;
    state.person = null;

    $('#team-view').hidden = true;
    $('#team-view').replaceChildren();
    $('#overview').hidden = false;

    all('.nav-team').forEach((button) => {
      button.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
    });

    $('#announcer').textContent =
      'All teams closed. The team atlas is rotating.';

    if (prior) {
      $(`.nav-team[data-team="${prior.key}"]`).focus({
        preventScroll: true,
      });
    }

    resizeScene();
    scrollDirectory();
  }

  function openProfile(id) {
    const person = byId.get(Number(id));
    if (!person) return;

    const trigger = state.person
      ? state.profileTrigger
      : activeElement();

    const alreadyOpen = Boolean(state.person);

    if (state.team?.key !== person.team.key) {
      showTeam(person.team.key, {
        toggle: false,
        focus: false,
      });
    }

    state.profileTrigger = trigger?.isConnected
      ? trigger
      : $(`[data-person="${person.id}"]`);

    state.person = person;

    all('.person').forEach((button) => {
      button.classList.toggle(
        'selected',
        Number(button.dataset.person) === person.id,
      );
    });

    const reports = person.parent
      ? person.parent.name
      : person.team.key === 'leadership'
        ? ''
        : 'Fund Co-Heads';

    $('#profile').innerHTML = `
      <div class="profile-top">
        <span class="eyebrow">
          MEMBER PROFILE · ${num(person.team.index)}
        </span>

        <button
          class="close-profile"
          data-action="close-profile"
          aria-label="Close member profile"
        >
          ×
        </button>
      </div>

      <div class="profile-identity">
        <div class="profile-monogram" aria-hidden="true">
          ${initials(person.name)}
        </div>

        <span class="profile-chapter" aria-hidden="true">
          ${num(person.team.index)}
        </span>

        <p class="profile-role">
          ${escapeHTML(role(person.role))}
        </p>

        <h2 id="profile-name">
          ${escapeHTML(person.name)}
        </h2>

        <p class="profile-team">${person.team.name}</p>
      </div>

      <div class="profile-body">
        <div class="detail-block">
          <span class="detail-label">EMAIL ADDRESS</span>

          ${
            person.email
              ? `
                <a
                  class="profile-email"
                  href="mailto:${escapeHTML(person.email)}"
                >
                  ${escapeHTML(person.email)}
                </a>
              `
              : '<p class="empty-detail">Not listed</p>'
          }
        </div>

        <div class="detail-block profile-meta">
          <div>
            <span class="detail-label">YEAR OF STUDY</span>
            <p>
              ${escapeHTML(
                /^\d+$/.test(person.year)
                  ? `Year ${person.year}`
                  : person.year || 'Not listed',
              )}
            </p>
          </div>

          <div>
            <span class="detail-label">
              FACULTY / PROGRAMME
            </span>
            <p>${escapeHTML(person.fac || 'Not listed')}</p>
          </div>
        </div>

        ${
          options.showExperience === false
            ? ''
            : `
              <div class="detail-block">
                <span class="detail-label">
                  PRIOR EXPERIENCE
                </span>

                ${
                  person.exp
                    ? `
                      <ul class="experience-list">
                        ${person.exp
                          .split(',')
                          .map(
                            (item) =>
                              `<li>${escapeHTML(
                                item.trim(),
                              )}</li>`,
                          )
                          .join('')}
                      </ul>
                    `
                    : '<p class="empty-detail">Not listed</p>'
                }
              </div>
            `
        }

        ${
          reports
            ? `
              <div class="detail-block">
                <span class="detail-label">REPORTS TO</span>
                <p class="reporting-value">
                  ${escapeHTML(reports)}
                </p>
              </div>
            `
            : ''
        }

        ${
          person.children.length
            ? `
              <div class="profile-member-count">
                ${descendantCount(person)}
                ${
                  [
                    'PM',
                    'Head of Risk',
                    'Head of Developers',
                  ].includes(person.role)
                    ? 'analysts'
                    : 'team members'
                }
                in ${escapeHTML(
                  person.name.split(' ')[0],
                )}’s team
              </div>
            `
            : ''
        }
      </div>
    `;

    const roster = person.team.members;
    const position = roster.findIndex(
      (item) => item.id === person.id,
    );

    $('#profile').insertAdjacentHTML(
      'beforeend',
      `
        <nav
          class="profile-pagination"
          aria-label="Browse team members"
        >
          <button
            data-profile-step="-1"
            aria-label="Previous team member"
          >
            ← <span>Previous</span>
          </button>

          <span>
            ${num(position + 1)} / ${num(roster.length)}
          </span>

          <button
            data-profile-step="1"
            aria-label="Next team member"
          >
            <span>Next</span> →
          </button>
        </nav>
      `,
    );

    $('#profile').hidden = false;
    $('#profile-backdrop').hidden = true;

    if (!alreadyOpen) {
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      $('#profile').showModal();
    }

    $('.app-shell').inert = true;
    $('.topbar').inert = true;
    $('.close-profile').focus({ preventScroll: true });
    $('#profile').scrollTop = 0;
  }

  function closeProfile({ restore = true } = {}) {
    if (!state.person) return;

    $('#profile').close();
    $('#profile').hidden = true;
    $('#profile-backdrop').hidden = true;

    document.body.style.overflow = savedBodyOverflow;
    $('.app-shell').inert = false;
    $('.topbar').inert = false;

    all('.person').forEach((button) =>
      button.classList.remove('selected'),
    );

    state.person = null;

    if (restore) {
      if (state.profileTrigger?.isConnected) {
        state.profileTrigger.focus({ preventScroll: true });
      } else {
        $('#team-title')?.focus({ preventScroll: true });
      }
    }
  }

  on(scope, 'click', (event) => {
    const step = event.target.closest('[data-profile-step]');

    if (step && state.person) {
      const roster = state.person.team.members;
      const position = roster.findIndex(
        (person) => person.id === state.person.id,
      );

      const next =
        (position +
          Number(step.dataset.profileStep) +
          roster.length) %
        roster.length;

      openProfile(roster[next].id);
      return;
    }

    const team = event.target.closest('[data-team]');

    if (team) {
      showTeam(team.dataset.team);
      return;
    }

    const person = event.target.closest('[data-person]');

    if (person) {
      openProfile(person.dataset.person);
      return;
    }

    const action = event.target.closest('[data-action]');

    if (action?.dataset.action === 'close-team') {
      closeTeam();
    }

    if (action?.dataset.action === 'close-profile') {
      closeProfile();
    }

    if (!event.target.closest('.search-wrap')) {
      hideSearch();
    }
  });

  on($('.brand'), 'click', (event) => {
    event.preventDefault();
    if (state.team) closeTeam();
  });

  on($('#profile-backdrop'), 'click', () => closeProfile());

  on(scope, 'keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.person) {
        closeProfile();
        return;
      }

      if (!$('#search-results').hidden) {
        hideSearch();
        $('#search').focus();
        return;
      }

      if (state.team) closeTeam();
    }

    if (
      event.key === '/' &&
      !state.person &&
      event.target.tagName !== 'INPUT'
    ) {
      event.preventDefault();
      $('#search').focus();
    }

    if (event.key === 'Tab' && state.person) {
      const interactive = [
        ...$('#profile').querySelectorAll('button,a[href]'),
      ];

      const first = interactive[0];
      const last = interactive.at(-1);

      if (event.shiftKey && activeElement() === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        activeElement() === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  let searchResults = [];
  let searchIndex = 0;

  function hideSearch() {
    $('#search-results').hidden = true;
    $('#search').setAttribute('aria-expanded', 'false');
    $('#search').removeAttribute('aria-activedescendant');
  }

  function renderSearch() {
    const query = $('#search').value.trim().toLowerCase();

    if (!query) {
      hideSearch();
      return;
    }

    const teamResults = teams
      .filter((team) =>
        team.name.toLowerCase().includes(query),
      )
      .map((team) => ({ team }));

    const personResults = [...byId.values()]
      .filter((person) =>
        person.name.toLowerCase().includes(query),
      )
      .map((person) => ({ person }));

    searchResults = [
      ...teamResults,
      ...personResults,
    ].slice(0, 12);

    searchIndex = 0;

    $('#search-results').innerHTML = searchResults.length
      ? searchResults
          .map((result, index) => {
            const team = result.team || result.person.team;

            return `
              <button
                id="result-${index}"
                class="search-result ${
                  index === 0 ? 'active' : ''
                }"
                role="option"
                aria-selected="${index === 0}"
                data-result="${index}"
              >
                <span class="result-num">
                  ${num(team.index)}
                </span>

                <span>
                  <strong>
                    ${escapeHTML(
                      result.team?.name ||
                        result.person.name,
                    )}
                  </strong>

                  <small>
                    ${
                      result.team
                        ? `${result.team.members.length} members`
                        : `${escapeHTML(
                            role(result.person.role),
                          )} · ${result.person.team.name}`
                    }
                  </small>
                </span>

                <span class="result-arrow">↗</span>
              </button>
            `;
          })
          .join('')
      : '<div class="search-empty">No matching people or teams.</div>';

    $('#search-results').hidden = false;
    $('#search').setAttribute('aria-expanded', 'true');

    if (searchResults.length) {
      $('#search').setAttribute(
        'aria-activedescendant',
        'result-0',
      );
    } else {
      $('#search').removeAttribute(
        'aria-activedescendant',
      );
    }
  }

  function selectSearch(index) {
    const result = searchResults[index];
    if (!result) return;

    hideSearch();
    $('#search').value = '';

    if (result.team) {
      showTeam(result.team.key, { toggle: false });
    } else {
      openProfile(result.person.id);
    }
  }

  on($('#search'), 'input', renderSearch);

  on($('#search'), 'focus', () => {
    if ($('#search').value.trim()) renderSearch();
  });

  on($('#search-results'), 'click', (event) => {
    const button = event.target.closest('[data-result]');

    if (button) {
      event.stopPropagation();
      selectSearch(Number(button.dataset.result));
    }
  });

  on($('#search'), 'keydown', (event) => {
    if (
      event.key === 'Enter' &&
      !$('#search-results').hidden
    ) {
      event.preventDefault();
      selectSearch(searchIndex);
    }

    if (
      ['ArrowDown', 'ArrowUp'].includes(event.key) &&
      searchResults.length &&
      !$('#search-results').hidden
    ) {
      event.preventDefault();

      searchIndex =
        (searchIndex +
          (event.key === 'ArrowDown' ? 1 : -1) +
          searchResults.length) %
        searchResults.length;

      $('#search').setAttribute(
        'aria-activedescendant',
        `result-${searchIndex}`,
      );

      all('.search-result').forEach((result, index) => {
        result.classList.toggle(
          'active',
          index === searchIndex,
        );
        result.setAttribute(
          'aria-selected',
          String(index === searchIndex),
        );

        if (index === searchIndex) {
          result.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  });

  const canvas = $('#sculpture');
  const context = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let mobile = false;
  let sceneTime = 0;

  function resizeScene() {
    if ($('#overview').hidden) return;

    const bounds = canvas.getBoundingClientRect();

    width = bounds.width;
    height = bounds.height;
    pixelRatio = Math.min(devicePixelRatio || 1, 2);
    mobile = innerWidth <= 640;

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0,
    );

    drawScene();
    positionCards();
  }

  function project(x, y, z, angle) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);

    let projectedX = x * cosine + z * sine;
    let projectedZ = -x * sine + z * cosine;
    let projectedY = y * 0.93 - projectedZ * 0.36;

    projectedZ = y * 0.36 + projectedZ * 0.93;

    const perspective = 900 / (900 + projectedZ);

    return {
      x: width / 2 + projectedX * perspective,
      y:
        height * 0.5 +
        projectedY * perspective +
        state.smoothY * 12,
      z: projectedZ,
      s: perspective,
    };
  }

  function drawScene() {
    if (!width || !height) return;

    context.clearRect(0, 0, width, height);

    const scale =
      Math.min(width / 780, height / 500) *
      (mobile ? 1.25 : 1);

    const rotation =
      state.angle * 0.64 -
      0.3 +
      state.smoothX * 0.13;

    const glow = context.createRadialGradient(
      width * 0.5,
      height * 0.52,
      0,
      width * 0.5,
      height * 0.52,
      Math.min(width, height) * 0.55,
    );

    glow.addColorStop(0, 'rgba(121,76,38,.13)');
    glow.addColorStop(0.55, 'rgba(100,65,33,.055)');
    glow.addColorStop(1, 'rgba(36,27,15,0)');

    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const strips = [];

    for (let strand = 0; strand < 88; strand += 1) {
      const offset = strand / 87 - 0.5;
      const points = [];
      let depth = 0;

      for (let point = 0; point <= 185; point += 1) {
        const time = (point / 185) * Math.PI * 2;
        const wave =
          1 + 0.12 * Math.sin(3 * time + 0.3);
        const fold = offset * 132;

        const x =
          (181 * wave +
            fold * Math.cos(time * 1.5 + 0.5)) *
          Math.cos(time);

        const z =
          (142 * wave +
            fold * Math.cos(time * 1.5 + 0.5)) *
          Math.sin(time);

        const y =
          65 * Math.sin(2 * time + 0.4) +
          fold * Math.sin(time * 1.5 + 0.5);

        const projected = project(
          x * scale,
          y * scale,
          z * scale,
          rotation,
        );

        points.push(projected);
        depth += projected.z;
      }

      strips.push({
        points,
        depth: depth / points.length,
        strand,
      });
    }

    const segments = [];

    strips.forEach(({ points, strand }) => {
      for (
        let point = 0;
        point < points.length - 1;
        point += 1
      ) {
        const start = points[point];
        const end = points[point + 1];

        segments.push({
          start,
          end,
          strand,
          z: (start.z + end.z) * 0.5,
          point,
        });
      }
    });

    segments.sort((first, second) => second.z - first.z);

    for (const segment of segments) {
      const depth = Math.max(
        0,
        Math.min(
          1,
          (segment.z / scale + 230) / 460,
        ),
      );

      const sheen =
        0.57 +
        0.43 *
          Math.cos(
            segment.point * 0.036 +
              segment.strand * 0.014 +
              rotation,
          );

      const alpha =
        (0.1 + (1 - depth) * 0.5) *
        (0.56 + sheen * 0.44);

      const red = Math.round(
        150 + (1 - depth) * 65 + sheen * 24,
      );
      const green = Math.round(
        94 + (1 - depth) * 53 + sheen * 25,
      );
      const blue = Math.round(
        51 + (1 - depth) * 35 + sheen * 22,
      );

      context.strokeStyle =
        `rgba(${red},${green},${blue},${alpha})`;

      context.lineWidth =
        (segment.strand % 11 === 0 ? 1.1 : 0.58) *
        Math.max(0.7, scale);

      context.beginPath();
      context.moveTo(
        segment.start.x,
        segment.start.y,
      );
      context.lineTo(segment.end.x, segment.end.y);
      context.stroke();
    }

    const reflection = context.createRadialGradient(
      width * 0.5,
      height * 0.86,
      0,
      width * 0.5,
      height * 0.86,
      width * 0.24,
    );

    reflection.addColorStop(
      0,
      'rgba(157,101,48,.045)',
    );
    reflection.addColorStop(1, 'rgba(80,50,20,0)');

    context.save();
    context.translate(0, height * 0.64);
    context.scale(1, 0.25);
    context.fillStyle = reflection;
    context.fillRect(0, 0, width, height * 2);
    context.restore();
  }

  function positionCards() {
    if (!width) return;

    const atlas = $('#atlas').getBoundingClientRect();

    if (mobile) {
      cards.forEach((card, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);

        const x = column
          ? atlas.width * 0.75 - 7
          : atlas.width * 0.25 + 7;

        const y = 65 + row * 181;

        const drift = reduceMotion.matches
          ? 0
          : Math.sin(sceneTime * 0.4 + index) * 4;

        card.style.transform =
          `translate(calc(-50% + ${
            x - atlas.width * 0.5
          }px), calc(-50% + ${
            y - atlas.height * 0.5 + drift
          }px))`;

        card.style.opacity = '1';
        card.style.zIndex = '3';
      });

      return;
    }

    const radiusX = Math.max(
      170,
      Math.min(width * 0.347, 520),
    );

    const radiusY = Math.min(height * 0.365, 280);

    cards.forEach((card, index) => {
      const angle =
        (index / 8) * Math.PI * 2 +
        state.angle -
        Math.PI / 2;

      const depth = Math.sin(angle);
      const x =
        Math.cos(angle) * radiusX +
        state.smoothX * 10;
      const y =
        Math.sin(angle) * radiusY +
        state.smoothY * 7;
      const scale = 0.9 + (depth + 1) * 0.06;
      const tilt = Math.cos(angle) * -3;

      card.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ` +
        `scale(${scale}) rotate(${tilt}deg)`;

      card.style.opacity = String(
        0.81 + (depth + 1) * 0.095,
      );

      card.style.zIndex = String(
        Math.round((depth + 1) * 3) + 3,
      );
    });
  }

  let frameCount = 0;

  function animate(now) {
    if (disposed) return;

    animationFrame = requestAnimationFrame(animate);

    const delta = Math.min(
      (now - (state.lastFrame || now)) / 1000,
      0.05,
    );

    state.lastFrame = now;

    if (
      state.team ||
      document.hidden ||
      !sceneVisible ||
      reduceMotion.matches
    ) {
      return;
    }

    sceneTime += delta;
    state.angle += delta * 0.037;

    state.smoothX +=
      (state.pointerX - state.smoothX) * 0.045;

    state.smoothY +=
      (state.pointerY - state.smoothY) * 0.045;

    positionCards();

    if (frameCount++ % 2 === 0) {
      drawScene();
    }
  }

  on(window, 'resize', resizeScene);
  on(reduceMotion, 'change', resizeScene);

  on($('#profile'), 'cancel', (event) => {
    event.preventDefault();
    closeProfile();
  });

  on($('#profile'), 'click', (event) => {
    if (event.target !== $('#profile')) return;

    const bounds = $('#profile').getBoundingClientRect();

    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      closeProfile();
    }
  });

  on($('#atlas'), 'pointermove', (event) => {
    const bounds = $('#atlas').getBoundingClientRect();

    state.pointerX =
      (event.clientX - bounds.left) / bounds.width -
      0.5;

    state.pointerY =
      (event.clientY - bounds.top) / bounds.height -
      0.5;
  });

  on($('#atlas'), 'pointerleave', () => {
    state.pointerX = 0;
    state.pointerY = 0;
  });

  cards.forEach((card, index) => {
    on(card, 'pointerenter', () => {
      state.hover = teams[index];

      $('#atlas-hover-label').textContent =
        `${teams[index].category} · ` +
        `${num(teams[index].members.length)} MEMBERS`;

      card.classList.add('lit');
    });

    on(card, 'pointerleave', () => {
      state.hover = null;

      $('#atlas-hover-label').textContent =
        `${uniquePeople} PEOPLE · 08 TEAMS`;

      card.classList.remove('lit');
    });
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      sceneVisible = entry.isIntersecting;
    },
    { rootMargin: '100px' },
  );

  observer.observe($('#overview'));

  resizeScene();
  animationFrame = requestAnimationFrame(animate);

  return {
    openTeam: (key) =>
      showTeam(key, {
        toggle: false,
      }),

    destroy() {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      controller.abort();
      observer.disconnect();

      if (state.person) {
        $('#profile').close();
        document.body.style.overflow =
          savedBodyOverflow;
      }
    },
  };
}
