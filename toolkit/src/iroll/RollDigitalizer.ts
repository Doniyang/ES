import Digitalizer from "./Digitalizer";
import Scope from './Scope';

export default class RollDigitalizer implements Digitalizer {
  /**
   * 滚动元素
   */
  private scrollElement: HTMLElement;
  /**
   * 状态
   * 1-transition 2-animate
   */
  private state: number;
  /**
   *阻止事件的默认行为  
   */
  private preventDefault: boolean;
  /**
   * 使用transition
   */
  private useTransition: boolean;
  /**
   * 使用  transform
   */
  private useTransform: boolean;

  private HWCompositing: boolean;
 
  private scope:Scope;

  constructor(el: HTMLElement,scope:Scope,options:any) {
    this.scrollElement = el;
    this.state = 0;
    this.preventDefault = options.preventDefault;
    this.useTransition = options.useTransition;
    this.useTransform = options.useTransform;
    this.HWCompositing = true;
    this.scope = scope;
  }

  private engine(): string {
    const u = navigator.userAgent
    if (u.indexOf('Trident') > -1) {
      return 'trident'
    } else if (u.indexOf('Presto') > -1) {
      return 'presto'
    } else if (u.indexOf('AppleWebKit') > -1) {
      return 'webKit'
    } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
      return 'gecko'
    } else {
      return ''
    }
  }

  private isBadAndroid(): boolean {
    let appVersion = window.navigator.appVersion;
    // Android browser is not a chrome browser.
    if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
      let safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
      if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
        return parseFloat(safariVersion[1]) < 535.19;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private prefix(): ScrollKit.Prefix {
    return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }
  }

  private prefixStyle(style: string): string {
    let key: string = this.engine();
    if (key === '') {
      return style
    } else {
      const prefix = this.prefix();
      return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1)
    }
  }

  private isPerspective(): boolean {
    let style = document.createElement('div').style;
    let prefixStyle = this.prefixStyle('perspective');
    return prefixStyle in style;
  }

  private isHWCompositing(): boolean {
    return this.HWCompositing;
  }

  private isSpeedup(): boolean {
    return this.isHWCompositing() && this.isPerspective();
  }

  private setState(state: number) {
    this.state = state;
  }

  private transitionTime(time: number) {
    let durationProp: string = this.prefixStyle('transitionDuration');
    let scrollStyle: CSSStyleDeclaration = this.scrollElement.style;
    scrollStyle.setProperty(durationProp, time + 'ms');

    if (time === 0 && this.isBadAndroid()) {
      scrollStyle.setProperty(durationProp, '0.0001ms');
      requestAnimationFrame(() => {
        if (scrollStyle.getPropertyValue(durationProp) === '0.0001ms') {
          scrollStyle.setProperty(durationProp, '0s');
        }
      });
    }
  }

  private transitionTimingFunction(easing: string) {
    let transitionTimingFunction: string = this.prefixStyle('transitionTimingFunction');
    let scrollStyle: CSSStyleDeclaration = this.scrollElement.style;
    scrollStyle.setProperty(transitionTimingFunction, easing)
  }


  private transition(x: number, y: number, time: number, style: string) {
    this.setState(1);
    this.transitionTimingFunction(style)
    this.transitionTime(time);
    this.translate(x, y);
    this.setState(0);
  }

  private animate(x: number, y: number, duration: number, easingfn: EaseKit.easefn) {
        this.setState(2);
           


  }


  scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions) {
    if (this.useTransition) {
      this.transition(x, y, time, easing.style);
    } else {
      this.animate(x, y, time, easing.fn);
    }
  }

  translate(x: number, y: number) {
    let scrollStyle: CSSStyleDeclaration = this.scrollElement.style;
    if (this.useTransform) {
      let transform = this.prefixStyle('transform');
      let translateZ = this.isSpeedup() ? 'translateZ(0)' : '';
      scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
    } else {
      scrollStyle.setProperty('top', Math.round(y) + 'px');
      scrollStyle.setProperty('left', Math.round(x) + 'px');
    }
  }

}