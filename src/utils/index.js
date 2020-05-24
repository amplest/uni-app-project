export const showLoading = (title = '加载中', mask = true, duration = 0) => {
  setTimeout(() => {
    uni.showLoading({
      title,
      mask
    })
  }, duration)
}

export const hideLoading = (duration = 0) => {
  setTimeout(() => {
    uni.hideLoading()
  }, duration)
}

export const showToast = (title, icon = 'none', duration = 2000, mask = true) => {
  uni.showToast({
    title,
    icon,
    duration,
    mask
  })
}

export const toPromise = function(fn, arg = {}) {
  return new Promise((resolve, reject) => {
    arg.success = resolve;
    arg.fail = reject;
    fn(arg)
  });
};

export const throttle = function(action, threshold = 160) {
  let timeId;
  let start = new Date();

  return function(...args) {
    let context = this,
      curr    = new Date() - 0;

    clearTimeout(timeId);
    if(curr - start >= threshold) {
      action.apply(context, args);
      start = curr;
    } else {
      timeId = setTimeout(function() {
        action.apply(context, args);
      }, threshold);
    }
  };
};

