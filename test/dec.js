class Boy {
  @speak('中文') // 设置更多的入参数据
  run() {
    console.log(' I can speak!' + this.language);
    console.log('I can run!')
  }
}

/**
 * target : Boy {}
 * key : run 
 * descriptor: 描述
 */

function speak(language) { // 设置更多的入参数据
  return function (target, key, descriptor) {
    console.log(target)
    console.log(key)
    console.log(descriptor)

    target.language = language;
  }
}

const luke = new Boy()

luke.run();