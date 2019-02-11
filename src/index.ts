import * as Twit from 'twit'
import { listenerCount } from 'cluster';

const twit = new Twit({
  consumer_key: 'dUeiGEnl27xLFjbaePk8I8224',
  consumer_secret: 'jSwodd72EppCA8Q7A6zKhHlYN6Xrg55lxlhlZsMdqmqGysi4WI',
  access_token: '3307312787-n0pyQzJDTIaoFcnyVKfOEKCFILuA6LXwMklDnBE',
  access_token_secret: 'PQTfGxhQgA2aRbEJVqc4joIMClgF56yJnpBDWk4IceahK'
})

const fn = async () => {
  const tweets = await twit.get('search/tweets', { q: '@super_fake_cat' })
  const list: Twit.Twitter.Status[] = (<any>tweets.data).statuses
  console.log(list)
}

//fn()

const sleep = () => {
  return new Promise((res, rej) => {
    setTimeout(res, 10000)
  })
}


const newFunc = async () => {

  let since_id: string | undefined = undefined

  while (true) {
    const tweets = await twit.get('search/tweets', { q: '@super_fake_cat', since_id })
    const list: Twit.Twitter.Status[] = (<any>tweets.data).statuses

    if (list.length) {
      let latestDate = list[0]
      since_id = latestDate.id.toString()

      list.map(tweet => {
        if (tweet.text.indexOf('fox') > -1) {
          twit.post('statuses/update', {
            status: `This is a random number: ${Math.random()} and I'm tweeting from a bot, for an exercise`,
          })
        }
      })
    }
    await sleep()
  }
}

//newFunc()

