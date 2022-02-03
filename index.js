#!/usr/bin/env node

class Main {
  async run() {
    this.displayFirstMessage()
    const birthNumer = await this.getBirthNumber()
    const birthYear = parseInt(birthNumer.toString().substr(0, 4))
    const birthMonth = parseInt(birthNumer.toString().substr(4, 2))
    const birthDay = parseInt(birthNumer.toString().substr(6, 2))
    
    this.eventdate = new EventDate(birthYear, birthMonth, birthDay)
    if (String(birthNumer).length != 8) {
      console.log('誕生日を8桁で入力してください')
      return
    } else if (birthMonth != this.eventdate.getBirth().getMonth() + 1) {
      console.log('誕生日を正しく入力してください')
      return
    }
    const gender = await this.getGender()
    const eventsDate = this.getEventsDate(this.eventdate, gender)

    this.displayLastMessage()
    Object.keys(this.sort(eventsDate)).forEach(function(key) {
      console.log(key.padEnd(12, '　'), this[key].toLocaleDateString({ timeZone: 'Asia/Tokyo' }))
    }, eventsDate)
  }

  async getBirthNumber() {
    const { NumberPrompt } = require('enquirer')
    const input = new NumberPrompt({
      message: '誕生日を入力してください 例) 20220101:',
    })
    const birthNumer = await input.run()
    return birthNumer
  }

  async getGender() {
    const { Select } = require ('enquirer')
    const select = new Select({
        message: '性別を選んでください',
        choices: ['男の子', '女の子', '回答しない']
      })
    const gender = await select.run()
    return gender
  }

  getEventsDate(eventdate, gender) {
    let eventsDate = {}
    eventsDate['お誕生日'] = eventdate.getBirth()
    eventsDate['お食い初め'] = eventdate.getOkuizome()
    eventsDate['ハーフバースデー'] = eventdate.getHalfBirth()
    eventsDate['小学校入学'] = eventdate.getElementarySchool()
    if (gender == '男の子') {
      eventsDate['お宮参り'] = eventdate.getOmiyamairiForBoy()
      eventsDate['初節句'] = eventdate.getSekku()
      eventsDate['七五三（５才）'] = eventdate.getSichigosanForFive()
      } else if (gender == '女の子') {
      eventsDate['お宮参り'] = eventdate.getOmiyamairiForGirl()
      eventsDate['桃の節句'] = eventdate.getMomonosekku()
      eventsDate['七五三（３才）'] = eventdate.getSichigosanForThree()
      eventsDate['七五三（７才）'] = eventdate.getSichigosanForSeven()
    } else if (gender == '回答しない') {
      eventsDate['お宮参り（男の子）'] = eventdate.getOmiyamairiForBoy()
      eventsDate['お宮参り（女の子）'] = eventdate.getOmiyamairiForGirl()
      eventsDate['桃の節句（女の子）'] = eventdate.getMomonosekku()
      eventsDate['初節句（男の子）'] = eventdate.getSekku()
      eventsDate['七五三（３才 女の子）'] = eventdate.getSichigosanForThree()
      eventsDate['七五三（５才 男の子）'] = eventdate.getSichigosanForFive()
      eventsDate['七五三（７才 女の子）'] = eventdate.getSichigosanForSeven()
    }
    return eventsDate
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
    '            👶 誕生日から行事を計算しました！           \n' +
    '--------------------------------------------------------\n' )
  }

  sort(eventsDate) {
    Object.entries(eventsDate).sort(function(a, b){
      return new Date(a) - new Date(b)
      })
    return Object.fromEntries(Object.entries(eventsDate))
  }
}

class EventDate {
  constructor(birthYear, birthMonth, birthDay) {
    this.birthYear = birthYear
    this.birthMonth = birthMonth
    this.birthDay = birthDay
  }

  getBirth() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay)
  }

  getHalfBirth() {
    return new Date(this.birthYear, this.birthMonth + 5, this.birthDay)
  }

  getOkuizome() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 99)
  }

  getOmiyamairiForBoy() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 30)  
  }

  getOmiyamairiForGirl() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 31)  
  }

  getMomonosekku() {
    if(this.getBirth() > new Date(this.birthYear, 3, 3)) {
      return new Date(this.birthYear + 1, 3, 3)
    } else {
      return new Date(this.birthYear, 3, 3)
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
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 4, 9, 15)
    } else {
      return new Date(this.birthYear + 3, 9, 15)
    }
  }

  getSichigosanForFive() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 6, 9, 15)
    } else {
      return new Date(this.birthYear + 5, 9, 15)
    }
  }

  getSichigosanForSeven() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 8, 9, 15)
    } else {
      return new Date(this.birthYear + 7, 9, 15)
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
