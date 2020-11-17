import { Quadratic } from "@niyang-es/toolkit";
import EventKit from "../utils/EventKit";
export default class RollStop {
    momentum(current, start, time, lowerMargin, wrapperSize, deceleration = 0.0006) {
        let distance = current - start, speed = Math.abs(distance) / time, destination, duration;
        destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;
        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        }
        else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }
        return {
            destination: Math.round(destination),
            duration: duration
        };
    }
    isLarge(a, b) {
        return a > b;
    }
    isunven(a, b) {
        return a !== b;
    }
    execute(e, attrs, proxy) {
        let pos = proxy.getPosition(), duration = Date.now() - attrs.getStartTime(), newX = Math.round(pos.x), newY = Math.round(pos.y), time = 0, easing, momentumX, momentumY;
        attrs.setEndTime(Date.now());
        if (!proxy.isPeak()) {
            proxy.resetPosition();
            return;
        }
        proxy.scrollTo(newX, newY, 0);
        if (attrs.getState() != 2) {
            if (proxy.isTapable()) {
                EventKit.tap(e, 'tap');
            }
            if (proxy.isClickable()) {
                EventKit.click(e, 'click');
            }
            proxy.trigger('scroll:cancel', pos);
            return;
        }
        if (proxy.isOnRush() && this.isLarge(300, duration)) {
            momentumX = proxy.isHScroll() ? this.momentum(pos.x, attrs.getStartX(), duration, proxy.getMaxScroll().x, proxy.isResilient() ? proxy.getSize().x : 0, proxy.getDeceleration()) : { destination: newX, duration: 0 };
            momentumY = proxy.isVScroll() ? this.momentum(pos.y, attrs.getStartY(), duration, proxy.getMaxScroll().y, proxy.isResilient() ? proxy.getSize().y : 0, proxy.getDeceleration()) : { destination: newY, duration: 0 };
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            proxy.setState(1);
        }
        if (this.isunven(newX, pos.x) || this.isunven(newY, pos.y)) {
            if (this.isLarge(newX, 0) || this.isLarge(proxy.getMaxScroll().x, newX) || this.isLarge(newY, 0) || this.isLarge(proxy.getMaxScroll().y, newY)) {
                easing = new Quadratic();
                proxy.isTransition() ? proxy.setAnimation(easing.style()) : proxy.setAnimation(easing.algorithm);
            }
            proxy.scrollTo(newX, newY, time);
            return;
        }
        proxy.trigger('scroll:end', pos);
    }
}
