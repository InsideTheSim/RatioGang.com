import Vue from 'vue';

import EasterEgg from '@/components/EasterEgg.vue';
import EthStats from '@/components/EthStats.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';
import GitCoinGrants from '@/components/GitCoinGrants.vue';
import Logo from '@/components/Logo.vue';
import MaxiTears from '@/components/MaxiTears.vue';
import PriceStats from '@/components/PriceStats.vue';
import RatioMeter from '@/components/RatioMeter.vue';
import TheSiteFooter from '@/components/TheSiteFooter.vue';
import TheSiteHeader from '@/components/TheSiteHeader.vue';

import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import IconCaretUp from '@/components/icons/IconCaretUp.vue';

export default function () {
  Vue.component('EasterEgg', EasterEgg);
  Vue.component('EthStats', EthStats);
  Vue.component('FrequentlyAskedQuestions', FrequentlyAskedQuestions);
  Vue.component('GitCoinGrants', GitCoinGrants);
  Vue.component('Logo', Logo);
  Vue.component('MaxiTears', MaxiTears);
  Vue.component('PriceStats', PriceStats);
  Vue.component('RatioMeter', RatioMeter);
  Vue.component('TheSiteFooter', TheSiteFooter);
  Vue.component('TheSiteHeader', TheSiteHeader);

  Vue.component('IconCaretDown', IconCaretDown);
  Vue.component('IconCaretUp', IconCaretUp);
}
