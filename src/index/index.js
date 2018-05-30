const addFly = canFly => target => {
  let method = target.prototype.toString
  target.prototype.toString = (...args) => {
    return method.apply(target.prototype, args) + (canFly ? '(技能加成:飞行能力)' : '')
  }
  return target
}

const decorateArmour = (target, key, descriptor) => {
  const method = descriptor.value
  descriptor.value = (...args) => {
    args[0] += 100
    return method.apply(target, args)
  }
  return descriptor
}

const hi = () => {
  console.log('hi:')
}

const add10 = num => (target, key, descriptor) => {
  const method = descriptor.value
  descriptor.value = (...args) => {
    args.push(10)
    return method.apply(target, args)
  }
  return descriptor
}

@addFly(true)
class Man {
  constructor (def = 2, atk = 3, hp = 3) {
    this.init(def, atk, hp)
  }

  @decorateArmour
  init (def, atk, hp) {
    this.def = def
    this.atk = atk
    this.hp = hp
  }

  @hi
  say () {
    console.log('come on baby')
  }

  @add10(10)
  add (...args) {
    return args.reduce((a, b) => a + b)
  }

  toString () {
    return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`
  }
}

const tony = new Man()
tony.say()
console.log(tony.add(1, 2))

console.log(`当前状态 ===> ${tony}`)

// console.log('index')