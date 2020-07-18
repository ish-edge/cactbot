'use strict';

[{
  zoneRegex: {
    en: /^Eden's Verse: Iconoclasm \(Savage\)$/,
    ko: /^희망의 낙원 에덴: 공명편\(영웅\) \(3\)$/,
  },
  zoneId: ZoneId.EdensVerseIconoclasmSavage,
  timelineFile: 'e7s.txt',
  triggers: [
    {
      id: 'E7S Empty Wave',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C8A', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C8A', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C8A', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C8A', capture: false }),
      condition: function(data) {
        return data.role == 'healer' || data.role == 'tank' || data.CanAddle();
      },
      response: Responses.aoe(),
    },
    {
      id: 'E7S Unshadowed Stake',
      netRegex: NetRegexes.tether({ source: 'The Idol Of Darkness', id: '0025' }),
      netRegexDe: NetRegexes.tether({ source: 'Götzenbild Der Dunkelheit', id: '0025' }),
      netRegexFr: NetRegexes.tether({ source: 'Idole Des Ténèbres', id: '0025' }),
      netRegexJa: NetRegexes.tether({ source: 'ダークアイドル', id: '0025' }),
      condition: function(data) {
        return data.role == 'tank' || data.role == 'healer';
      },
      response: Responses.tankBuster(),
    },
    {
      id: 'E7S Betwixt Worlds',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4CFD', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4CFD', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4CFD', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4CFD', capture: false }),
      run: function(data) {
        data.phase = 'betwixtWorlds';
      },
    },
    {
      id: 'E7S Betwixt Worlds Tether',
      netRegex: NetRegexes.tether({ source: 'The Idol Of Darkness', id: '0011' }),
      netRegexDe: NetRegexes.tether({ source: 'Götzenbild Der Dunkelheit', id: '0011' }),
      netRegexFr: NetRegexes.tether({ source: 'Idole Des Ténèbres', id: '0011' }),
      netRegexJa: NetRegexes.tether({ source: 'ダークアイドル', id: '0011' }),
      condition: function(data) {
        return data.phase == 'betwixtWorlds';
      },
      preRun: function(data, matches) {
        data.betwixtWorldsTethers = data.betwixtWorldsTethers || [];
        data.betwixtWorldsTethers.push(matches.target);
      },
      infoText: function(data, matches) {
        if (data.me == matches.target) {
          return {
            en: 'Tether on YOU',
            de: 'Verbindung auf DIR',
            fr: 'Lien sur VOUS',
            cn: '连线点名',
            ko: '선 대상자',
          };
        }
      },
    },
    {
      id: 'E7S Betwixt Worlds Stack',
      netRegex: NetRegexes.headMarker({ id: '0064' }),
      condition: function(data) {
        return data.phase == 'betwixtWorlds';
      },
      preRun: function(data, matches) {
        data.betwixtWorldsStack = data.betwixtWorldsStack || [];
        data.betwixtWorldsStack.push(matches.target);
      },
      alertText: function(data, matches) {
        data.betwixtWorldsTethers = data.betwixtWorldsTethers || [];
        if (data.betwixtWorldsTethers.includes(data.me))
          return;
        if (data.me == matches.target) {
          return {
            en: 'Stack on YOU',
            de: 'Sammeln auf DIR',
            fr: 'Package sur VOUS',
            ja: '自分にシェア',
            cn: '分摊点名',
            ko: '나에게 모이기',
          };
        }
        if (data.betwixtWorldsStack.length == 1)
          return;
        let names = data.betwixtWorldsStack.map((x) => data.ShortName(x)).sort();
        return {
          en: 'Stack (' + names.join(', ') + ')',
          de: 'Sammeln (' + names.join(', ') + ')',
          fr: 'Package (' + names.join(', ') + ')',
          cn: '分摊 (' + names.join(', ') + ')',
          ko: '모이기 (' + names.join(', ') + ')',
        };
      },
    },
    {
      id: 'E7S Left With Thee',
      netRegex: NetRegexes.gainsEffect({ effectId: '8C2' }),
      condition: Conditions.targetIsYou(),
      infoText: {
        en: 'Teleporting Left',
        de: 'Teleportation Links',
        fr: 'Téléportation à gauche',
        cn: '向左传送',
        ko: '왼쪽으로 순간이동',
      },
    },
    {
      id: 'E7S Right With Thee',
      netRegex: NetRegexes.gainsEffect({ effectId: '8C3' }),
      condition: Conditions.targetIsYou(),
      infoText: {
        en: 'Teleporting Right',
        de: 'Teleportation Rechts',
        fr: 'Téléportation à droite',
        cn: '向右传送',
        ko: '오른쪽으로 순간이동',
      },
    },
    {
      id: 'E7S Forward With Thee',
      netRegex: NetRegexes.gainsEffect({ effectId: '8C0' }),
      condition: Conditions.targetIsYou(),
      infoText: {
        en: 'Teleporting Forward',
        de: 'Teleportation Vorwärts',
        fr: 'Téléportation devant',
        cn: '向前传送',
        ko: '앞으로 순간이동',
      },
    },
    {
      id: 'E7S Back With Thee',
      netRegex: NetRegexes.gainsEffect({ effectId: '8C1' }),
      condition: Conditions.targetIsYou(),
      infoText: {
        en: 'Teleporting Back',
        de: 'Teleportation Rückwärts',
        fr: 'Téléportation derrière',
        cn: '向后传送',
        ko: '뒤로 순간이동',
      },
    },
    {
      id: 'E7S False Midnight',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C99', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C99', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C99', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C99', capture: false }),
      run: function(data) {
        data.phase = 'falseMidnight';
      },
    },
    {
      id: 'E7S Silver Shot',
      netRegex: NetRegexes.headMarker({ id: '0065' }),
      condition: function(data) {
        return data.phase == 'falseMidnight';
      },
      preRun: function(data, matches) {
        data.falseMidnightSpread = data.falseMidnightSpread || [];
        data.falseMidnightSpread.push(matches.target);
      },
      infoText: function(data, matches) {
        if (data.me == matches.target) {
          return {
            en: 'Spread',
            de: 'Verteilen',
            fr: 'Dispersez-vous',
            ja: '散開',
            cn: '分散',
            ko: '산개',
          };
        }
      },
    },
    {
      id: 'E7S Silver Sledge',
      netRegex: NetRegexes.headMarker({ id: '0064' }),
      condition: function(data) {
        return data.phase == 'falseMidnight';
      },
      // The stack marker is in the middle of spreads,
      // so delay a tiny bit to call out stack so that
      // it is not called out on spreads.
      delaySeconds: 0.5,
      alertText: function(data, matches) {
        data.falseMidnightSpread = data.falseMidnightSpread || [];
        if (data.falseMidnightSpread.includes(data.me))
          return;
        if (data.me == matches.target) {
          return {
            en: 'Stack on YOU',
            de: 'Sammeln auf DIR',
            fr: 'Package sur VOUS',
            ja: '自分にシェア',
            cn: '分摊点名',
            ko: '나에게 모이기',
          };
        }
        return {
          en: 'Stack on ' + data.ShortName(matches.target),
          de: 'Auf ' + data.ShortName(matches.target) + ' sammeln',
          fr: 'Packez-vous sur ' + data.ShortName(matches.target),
          ja: data.ShortName(matches.target) + 'にスタック',
          cn: '靠近 ' + data.ShortName(matches.target) + '集合',
          ko: '쉐어징 → ' + data.ShortName(matches.target),
        };
      },
    },
    {
      id: 'E7S Adds',
      netRegex: NetRegexes.addedCombatant({ name: 'Blasphemy', capture: false }),
      netRegexDe: NetRegexes.addedCombatant({ name: 'Blasphemie', capture: false }),
      netRegexFr: NetRegexes.addedCombatant({ name: 'Vol D\'idolâtries Impardonnables', capture: false }),
      netRegexJa: NetRegexes.addedCombatant({ name: 'ブラスヒーム', capture: false }),
      suppressSeconds: 1,
      run: function(data) {
        data.phase = 'adds';
      },
    },
    {
      id: 'E7S Advent Of Light',
      netRegex: NetRegexes.startsUsing({ source: 'Idolatry', id: '4C6E' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Idolatrie', id: '4C6E' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Vol D\'Idolâtries Impardonnables', id: '4C6E' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アイドラトリー', id: '4C6E' }),
      condition: (data) => data.CanSilence(),
      suppressSeconds: 1,
      response: Responses.interrupt('alarm'),
    },
    {
      id: 'E7S Insatiable Light Stack',
      netRegex: NetRegexes.headMarker({ id: '0064' }),
      condition: function(data) {
        return data.phase == 'adds';
      },
      preRun: function(data, matches) {
        data.insatiableLightStack = data.insatiableLightStack || [];
        data.insatiableLightStack.push(matches.target);
      },
      alertText: function(data, matches) {
        if (data.me == matches.target) {
          return {
            en: 'Stack on YOU',
            de: 'Sammeln auf DIR',
            fr: 'Package sur VOUS',
            ja: '自分にシェア',
            cn: '分摊点名',
            ko: '나에게 쉐어징',
          };
        }
        if (data.insatiableLightStack.length == 1)
          return;
        let names = data.insatiableLightStack.map((x) => data.ShortName(x)).sort();
        return {
          en: 'Stack (' + names.join(', ') + ')',
          de: 'Sammeln (' + names.join(', ') + ')',
          fr: 'Packez-vous (' + names.join(', ') + ')',
          cn: '分摊 (' + names.join(', ') + ')',
          ko: '모이기 (' + names.join(', ') + ')',
        };
      },
    },
    {
      id: 'E7S Insatiable Light',
      netRegex: NetRegexes.ability({ source: 'Idolatry', id: '4C6D', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Idolatrie', id: '4C6D', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Vol D\'idolâtries Impardonnables', id: '4C6D', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'アイドラトリー', id: '4C6D', capture: false }),
      run: function(data) {
        data.insatiableLightStack = [];
      },
    },
    {
      id: 'E7S Strength in Numbers',
      netRegex: NetRegexes.startsUsing({ source: 'Idolatry', id: '4C70', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Idolatrie', id: '4C70', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Vol D\'idolâtries Impardonnables', id: '4C70', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アイドラトリー', id: '4C70', capture: false }),
      suppressSeconds: 1,
      infoText: {
        en: 'Get under vertical add',
        de: 'Unter das vertikale Add gehen',
        fr: 'Allez sous l\'add vertical',
        ko: '똑바로 서 있는 쫄 아래로',
        cn: '去垂直小怪脚下',
      },
    },
    {
      id: 'E7S Unearned Envy',
      netRegex: NetRegexes.ability({ source: 'Blasphemy', id: '4C74', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Blasphemie', id: '4C74', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Vol D\'idolâtries Impardonnables', id: '4C74', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'ブラスヒーム', id: '4C74', capture: false }),
      condition: function(data) {
        return data.role == 'healer' || data.role == 'tank' || data.CanAddle();
      },
      durationSeconds: 7,
      suppressSeconds: 15,
      response: Responses.aoe(),
    },
    {
      id: 'E7S Empty Flood',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '(?:4C8[BC]|4E5[56])', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '(?:4C8[BC]|4E5[56])', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '(?:4C8[BC]|4E5[56])', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '(?:4C8[BC]|4E5[56])', capture: false }),
      condition: function(data) {
        return data.role == 'healer' || data.role == 'tank' || data.CanAddle();
      },
      suppressSeconds: 1,
      response: Responses.aoe(),
    },
    {
      id: 'E7S Unjoined Aspect',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C3B', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C3B', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C3B', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C3B', capture: false }),
      run: function(data) {
        data.colorMap = {};
        data.colorMap['light'] = {
          en: 'Dark',
          de: 'Dunkel',
          fr: 'Noir',
          cn: '黑色',
          ko: '어둠',
        };
        data.colorMap['dark'] = {
          en: 'Light',
          de: 'Licht',
          fr: 'Blanc',
          cn: '白色',
          ko: '빛',
        };
      },
    },
    {
      id: 'E7S Astral Effect',
      netRegex: NetRegexes.gainsEffect({ effectId: '8BE' }),
      condition: Conditions.targetIsYou(),
      run: function(data) {
        data.color = 'light';
      },
    },
    {
      id: 'E7S Umbral Effect',
      netRegex: NetRegexes.gainsEffect({ effectId: '8BF' }),
      condition: Conditions.targetIsYou(),
      run: function(data) {
        data.color = 'dark';
      },
    },
    {
      id: 'E7S Boundless Tracker',
      netRegex: NetRegexes.startsUsing({ source: 'Unforgiven Idolatry', id: '4C5[CD]' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ungeläutert(?:e|er|es|en) Götzenverehrung', id: '4C5[CD]' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Nuée D\'idolâtries Impardonnables', id: '4C5[CD]' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アンフォーギヴン・アイドラトリー', id: '4C5[CD]' }),
      run: function(data, matches) {
        data.boundless = data.boundless || {};
        let oppositeColor = matches.id == '4C5C' ? 'dark' : 'light';
        data.boundless[oppositeColor] = matches.target;
      },
    },
    {
      id: 'E7S Boundless Light Dark Stack',
      netRegex: NetRegexes.startsUsing({ source: 'Unforgiven Idolatry', id: '4C5[CD]' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ungeläutert(?:e|er|es|en) Götzenverehrung', id: '4C5[CD]' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Nuée D\'Idolâtries Impardonnables', id: '4C5[CD]' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アンフォーギヴン・アイドラトリー', id: '4C5[CD]' }),
      condition: function(data, matches) {
        if (Object.keys(data.boundless).length != 2)
          return false;
        let oppositeColor = matches.id == '4C5C' ? 'dark' : 'light';
        return data.color == oppositeColor;
      },
      response: function(data, matches) {
        // If somebody is taking both, definitely don't stack with them!
        if (data.boundless.light == data.boundless.dark) {
          if (matches.target == data.me)
            return;
          return {
            infoText: {
              en: 'Avoid ' + data.ShortName(matches.target),
              de: 'Vermeide ' + data.ShortName(matches.target),
              fr: 'Évitez ' + data.ShortName(matches.target),
            },
          };
        }
        return Responses.stackOn();
      },
    },
    {
      id: 'E7S Boundless Cleanup',
      netRegex: NetRegexes.startsUsing({ source: 'Unforgiven Idolatry', id: '4C5[CD]' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ungeläutert(?:e|er|es|en) Götzenverehrung', id: '4C5[CD]' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Nuée D\'Idolâtries Impardonnables', id: '4C5[CD]' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アンフォーギヴン・アイドラトリー', id: '4C5[CD]' }),
      delaySeconds: 20,
      run: function(data, matches) {
        delete data.boundless;
      },
    },
    {
      id: 'E7S Words of Night',
      netRegex: NetRegexes.startsUsing({ source: 'Unforgiven Idolatry', id: '(?:4C2C|4C65)', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ungeläutert(?:e|er|es|en) Götzenverehrung', id: '(?:4C2C|4C65)', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Nuée D\'idolâtries Impardonnables', id: '(?:4C2C|4C65)', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'アンフォーギヴン・アイドラトリー', id: '(?:4C2C|4C65)', capture: false }),
      alertText: function(data) {
        data.colorMap = data.colorMap || [];
        let colorTrans = data.colorMap[data.color] || {};
        let color = colorTrans[data.displayLang];
        if (!color)
          return;
        return {
          en: 'Get hit by ' + color,
          de: 'Lass dich treffen von ' + color,
          fr: 'Encaissez le ' + color,
          cn: '撞' + color,
          ko: color + ' 맞기',
        };
      },
    },
    {
      id: 'E7S False Dawn',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C9A', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C9A', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C9A', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C9A', capture: false }),
      suppressSeconds: 1,
      alertText: {
        en: 'Bait Puddles',
        de: 'Flächen ködern',
        fr: 'Placez les zones au sol',
        cn: '放圈',
        ko: '장판 버리기',
      },
    },
    {
      id: 'E7S Crusade',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C76', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C76', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C76', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C76', capture: false }),
      // Can't use knockback prevention for this, so say where to get knocked back.
      alertText: {
        en: 'Get Knocked Into Corner',
        de: 'Lass dich in die Ecke zurückstoßen',
        fr: 'Faites-vous pousser dans les coins',
        cn: '击退到角落',
        ko: '구석으로 넉백',
      },
    },
    {
      id: 'E7S Unjoined Aspect P3',
      netRegex: NetRegexes.ability({ source: 'The Idol Of Darkness', id: '4C7A', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Götzenbild Der Dunkelheit', id: '4C7A', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Idole Des Ténèbres', id: '4C7A', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'ダークアイドル', id: '4C7A', capture: false }),
      // Color buffs go out immediately after the cast
      delaySeconds: 0.1,
      infoText: function(data) {
        if (data.role == 'tank') {
          return {
            en: 'Go South',
            de: 'Geh nach Süden',
            fr: 'Allez au Sud',
            ko: '남쪽',
          };
        }
        if (data.color == 'light') {
          return {
            en: 'Go Northwest',
            de: 'Geh nach Nordwesten',
            fr: 'Allez au Nord-Ouest',
            ko: '북서쪽',
          };
        }
        return {
          en: 'Go Northeast',
          de: 'Geh nach Nordosten',
          fr: 'Allez au Nord-Est',
          ko: '북동쪽',
        };
      },
    },
    {
      id: 'E7S Threefold Grace',
      netRegex: NetRegexes.startsUsing({ source: 'The Idol Of Darkness', id: '4C7E', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Götzenbild Der Dunkelheit', id: '4C7E', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Idole Des Ténèbres', id: '4C7E', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダークアイドル', id: '4C7E', capture: false }),
      alertText: function(data) {
        data.colorMap = data.colorMap || [];
        let colorTrans = data.colorMap[data.color] || {};
        let color = colorTrans[data.displayLang];
        if (!color)
          return;
        return {
          en: 'Stand in ' + color,
          de: 'Stehe in ' + color,
          fr: 'Restez sur ' + color,
          cn: '站进' + color,
          ko: color + '에 서기',
        };
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Unforgiven Idolatry': 'ungeläutert(?:e|er|es|en) Götzenverehrung',
        'The Idol Of Darkness': 'Götzenbild der Dunkelheit',
        '(?<! )Idolatry': 'Idolatrie',
        'Blasphemy': 'Blasphemie',
      },
      'replaceText': {
        'Words Of Unity': 'Kommando: Stürmischer Angriff',
        'Words Of Spite': 'Kommando: Anvisieren',
        'Words Of Night': 'Kommando: Nächtlicher Angriff',
        'Words Of Motion': 'Kommando: Wellen',
        'Words Of Fervor': 'Kommando: Wilder Tanz',
        'Words Of Entrapment': 'Kommando: Einkesselung',
        'Unshadowed Stake': 'Dunkler Nagel',
        'Unjoined Aspect': 'Attributswechsel',
        'Unearned Envy': 'Verteidigungsinstinkt',
        'Threefold Grace': 'Dreifache Korona',
        'Stygian Sword': 'Schwarzes Schwert',
        'Stygian Spear': 'Schwarzer Speer',
        'Strength In Numbers': 'Angriffsmanöver',
        'Silver Sword': 'Weißes Lichtschwert',
        'Silver Stake': 'Heller Nagel',
        'Silver Spear': 'Weißer Lichtspeer',
        'Silver Sledge': 'Weißer Lichthammer',
        'Silver Shot': 'Weißer Lichtpfeil',
        'Silver Scourge': 'Peitschendes Licht',
        'Shockwave': 'Schockwelle',
        'Overwhelming Force': 'Vernichtende Schlammflut',
        'Light\'s Course': 'Weißer Strom des Lichts',
        'Insatiable Light': 'Licht des Verderbens',
        'Fate\'s Course': 'Reißender Strom',
        'False Moonlight': 'Manöver der Nacht',
        'False Midnight': 'Manöver der Polarnacht',
        'False Dawn': 'Manöver des Morgengrauens',
        'Empty Wave': 'Welle der Leere',
        'Empty Flood': 'Flut der Leere',
        'Dark\'s Course': 'Weißer Strom des Lichts',
        'Crusade': 'Ansturm',
        'Boundless Light': 'Weißer Lichtstrom',
        'Black Smoke': 'Schwarzes Feuer',
        'Betwixt Worlds': 'Dimensionsloch',
        'Away With Thee': 'Zwangsumwandlung',
        'Advent Of Light': 'Lichtsaturation',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Unforgiven Idolatry': 'Nuée D\'idolâtries Impardonnables',
        'The Idol Of Darkness': 'Idole des Ténèbres',
        '(?<! )Idolatry': 'Vol D\'idolâtries Impardonnables',
        'Blasphemy': 'Vol D\'idolâtries Impardonnables',
      },
      'replaceText': {
        'Words Of Unity': 'Ordre d\'assaut',
        'Words Of Spite': 'Ordre de visée',
        'Words Of Night': 'Ordre d\'attaque-surprise',
        'Words Of Motion': 'Ordre de déferlement',
        'Words Of Fervor': 'Ordre de virevolte',
        'Words Of Entrapment': 'Ordre d\'encerclement',
        'White/Black Smoke': 'Brûlure immaculée/ténébreuse',
        'Unshadowed Stake': 'Poinçon clair-obscur',
        'Unjoined Aspect': 'Transition élémentaire',
        'Unearned Envy': 'Mécanisme de défense',
        'Threefold Grace': 'Couronne triple',
        'Stygian Sword': 'Épée ténébreuse',
        'Stygian Spear': 'Lance ténébreuse',
        'Strength In Numbers': 'Murmuration offensive',
        'Silver Sword': 'Épée immaculée',
        'Silver Stake': 'Poinçon immaculé',
        'Silver Spear': 'Lance immaculée',
        'Silver Sledge': 'Pilon immaculé',
        'Silver Shot': 'Trait immaculé',
        'Silver Scourge': 'Lumière fustigeante',
        'Shockwave': 'Onde de choc',
        'Overwhelming Force': 'Remous destructeurs',
        'Light\'s Course': 'Déferlement immaculé',
        'Insatiable Light': 'Lumière destructrice',
        'Fate\'s Course': 'Flot d\'énergie',
        'False Moonlight': 'Murmuration du jour polaire',
        'False Midnight': 'Murmuration de la nuit polaire',
        'False Dawn': 'Murmuration de l\'aube',
        'Empty Wave': 'Onde de néant',
        'Empty Flood': 'Déluge de néant',
        'Dark\'s Course': 'Déferlement ténébreux',
        'Crusade': 'Plongeon de la nuée',
        'Boundless Light': 'Flot immaculé',
        'Betwixt Worlds': 'Brèche dimensionnelle',
        'Away With Thee': 'Translation forcée',
        'Advent Of Light': 'Plénitude lumineuse',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'unforgiven idolatry': 'アンフォーギヴン・アイドラトリー',
        'the Idol of Darkness': 'ダークアイドル',
        '(?<! )idolatry': 'アイドラトリー',
        'blasphemy': 'ブラスヒーム',
      },
      'replaceText': {
        'Words of Unity': '強襲の号令',
        'Words of Spite': '照準の号令',
        'Words of Night': '夜襲の号令',
        'Words of Motion': '波状の号令',
        'Words of Fervor': '乱舞の号令',
        'Words of Entrapment': '包囲の号令',
        'Unshadowed Stake': '闇光の釘',
        'Unjoined Aspect': '属性変動',
        'Unearned Envy': '防衛本能',
        'Threefold Grace': '三重光環',
        'Stygian Sword': '黒闇の剣',
        'Stygian Spear': '黒闇の槍',
        'Strength in Numbers': '攻撃機動',
        'Silver Sword': '白光の剣',
        'Silver Stake': '白光の釘',
        'Silver Spear': '白光の槍',
        'Silver Sledge': '白光の槌',
        'Silver Shot': '白光の矢',
        'Silver Scourge': '白光の鞭',
        'Shockwave': '衝撃波',
        'Overwhelming Force': '破滅の濁流',
        'Light\'s Course': '白光の奔流',
        'Insatiable Light': '破滅の光',
        'Fate\'s Course': '奔流',
        'False Moonlight': '白夜の機動',
        'False Midnight': '極夜の機動',
        'False Dawn': '黎明の機動',
        'Empty Wave': '虚無の波動',
        'Empty Flood': '虚無の氾濫',
        'Dark\'s Course': '白光の奔流',
        'Crusade': '群体突進',
        'Boundless Light': '白光の激流',
        'Black Smoke': '黒闇の火',
        'Betwixt Worlds': '次元孔',
        'Away with Thee': '強制転移',
        'Advent of Light': '光の飽和',
      },
    },
  ],
}];
