import Vue from 'vue'
import 'intersection-observer'
import ObserverDirective from '~/libs/ObserverDirective'

export default function () {
  Vue.directive('observe', ObserverDirective)
}
