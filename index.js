#!/usr/bin/env node

const { NumberPrompt } = require('enquirer')
const { Select } = require ('enquirer')

class Main {
  async run() {
    this.displayFirstMessage()
    const numberprompt = new NumberPrompt({
      message: '誕生日を8桁で入力してください ex.20220101:',
    })
    const birthNumer = await numberprompt.run()
    const birthYear = Number(birthNumer.toString().substr(0, 4))
    const birthMonth = Number(birthNumer.toString().substr(4, 2)) - 1
    const birthDay = Number(birthNumer.toString().substr(6, 2))
    if (String(birthNumer).length !== 8) {
      console.log('誕生日が不明です...8桁で入力してください')
      return
    } else if (birthMonth !== new Date(birthYear, birthMonth, birthDay).getMonth()) {
      console.log('入力された誕生日は存在しませんでした...')
      return
    }
    
    const select = new Select({
      message: '性別を選んでください:',
      choices: ['男の子', '女の子', '回答しない']
    })
    const gender = await select.run()

    this.displayLastMessage()
    let eventDates = this.getEventDates(birthYear, birthMonth, birthDay, gender)
    eventDates = this.sort(eventDates)
    Object.keys(eventDates).forEach(function(key) {
      const eventDate = eventDates[key]
      const year = eventDate.getFullYear()
      const month = ('00' + (eventDate.getMonth() + 1)).slice(-2)
      const day = ('00' + eventDate.getDate()).slice(-2)
      console.log(key.padEnd(14, '　') + year + '/' + month + '/' + day)
    })
  }

  getEventDates(birthYear, birthMonth, birthDay, gender) {
    const eventdate = new EventDate(birthYear, birthMonth, birthDay)
    const eventDates = {}
    eventDates['お誕生日'] = eventdate.getBirth()
    eventDates['お食い初め'] = eventdate.getOkuizome()
    eventDates['ハーフバースデー'] = eventdate.getHalfBirth()
    eventDates['小学校入学'] = eventdate.getElementarySchool()
    if (gender === '男の子') {
      eventDates['お宮参り'] = eventdate.getOmiyamairiForBoy()
      eventDates['初節句'] = eventdate.getSekku()
      eventDates['七五三（５才）'] = eventdate.getSichigosanForFive()
    } else if (gender === '女の子') {
      eventDates['お宮参り'] = eventdate.getOmiyamairiForGirl()
      eventDates['桃の節句'] = eventdate.getMomonosekku()
      eventDates['七五三（３才）'] = eventdate.getSichigosanForThree()
      eventDates['七五三（７才）'] = eventdate.getSichigosanForSeven()
    } else if (gender === '回答しない') {
      eventDates['お宮参り（男の子）'] = eventdate.getOmiyamairiForBoy()
      eventDates['お宮参り（女の子）'] = eventdate.getOmiyamairiForGirl()
      eventDates['桃の節句（女の子）'] = eventdate.getMomonosekku()
      eventDates['初節句（男の子）'] = eventdate.getSekku()
      eventDates['七五三（３才女の子）'] = eventdate.getSichigosanForThree()
      eventDates['七五三（５才男の子）'] = eventdate.getSichigosanForFive()
      eventDates['七五三（７才女の子）'] = eventdate.getSichigosanForSeven()
    }
    return eventDates
  }

  displayFirstMessage() {
    console.log('\n' +
    '--------------------------------------------------------\n' +
    '                                                        \n' +
    '     🎂  子供の誕生日から行事の日付を計算します 🎂      \n' +
    '                                                        \n' +
    '--------------------------------------------------------\n' +
    '\n')
  }

  displayLastMessage() {
    console.log('\n' +
    '--------------------------------------------------------\n' +
    '        👶  誕生日から行事の日付を計算しました！        \n' +
    '--------------------------------------------------------\n' )
  }

  sort(eventDates) {
    let sortedDates = Object.entries(eventDates).sort(function(a, b){
      return (a[1] > b[1]) ? 1 : -1
    })
    return Object.fromEntries(sortedDates)
  }
}

class EventDate {
  constructor(birthYear, birthMonth, birthDay) {
    this.birthYear = birthYear
    this.birthMonth = birthMonth
    this.birthDay = birthDay
  }

  getBirth() {
    return new Date(this.birthYear, this.birthMonth, this.birthDay)
  }

  getHalfBirth() {
    return new Date(this.birthYear, this.birthMonth + 6, this.birthDay)
  }

  getOkuizome() {
    return new Date(this.birthYear, this.birthMonth, this.birthDay + 99)
  }

  getOmiyamairiForBoy() {
    return new Date(this.birthYear, this.birthMonth, this.birthDay + 30)
  }

  getOmiyamairiForGirl() {
    return new Date(this.birthYear, this.birthMonth, this.birthDay + 31)
  }

  getMomonosekku() {
    if(this.getBirth() > new Date(this.birthYear, 3, 3)) {
      return new Date(this.birthYear + 1, 2, 3)
    } else {
      return new Date(this.birthYear, 2, 3)
    }
  }

  getSekku() {
    if(this.getBirth() > new Date(this.birthYear, 5, 5)) {
      return new Date(this.birthYear + 1, 4, 5)
    } else {
      return new Date(this.birthYear, 4, 5)
    }
  }

  getSichigosanForThree() {
    if(this.getBirth() > new Date(this.birthYear, 11, 15)) {
      return new Date(this.birthYear + 4, 10, 15)
    } else {
      return new Date(this.birthYear + 3, 10, 15)
    }
  }

  getSichigosanForFive() {
    if(this.getBirth() > new Date(this.birthYear, 11, 15)) {
      return new Date(this.birthYear + 6, 10, 15)
    } else {
      return new Date(this.birthYear + 5, 10, 15)
    }
  }

  getSichigosanForSeven() {
    if(this.getBirth() > new Date(this.birthYear, 11, 15)) {
      return new Date(this.birthYear + 8, 10, 15)
    } else {
      return new Date(this.birthYear + 7, 10, 15)
    }
  }

  getElementarySchool() {
    if(this.getBirth() > new Date(this.birthYear, 4, 1)) {
      return new Date(this.birthYear + 7, 3, 1)
    } else {
      return new Date(this.birthYear + 6, 3, 1)
    }
  }
} 

new Main().run()
