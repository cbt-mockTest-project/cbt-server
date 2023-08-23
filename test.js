const scriptName = '모두cbt';

function isExistDataBase(key) {
  return DataBase.getDataBase(key) != null;
}

function removeFirstOccurrence(str, target) {
  const index = str.indexOf(target);
  if (index === -1) {
    return str;
  }
  return str.slice(0, index) + str.slice(index + target.length);
}

function getChatGPTResponse(msg) {
  let json;
  let result;
  try {
    let data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            '당신은 모든 분야에서 최고의 전문가입니다. 당신의 이름은 모두봇이며, 제작자는 부우입니다. 20대 여성처럼 친근하게 10초 이내로 답변해주세요',
        },
        { role: 'user', content: msg },
      ],
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    let response = org.jsoup.Jsoup.connect(
      'https://api.openai.com/v1/chat/completions',
    )
      .header(
        'Authorization',
        'Bearer ' + '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',
      ) // Open ai 토큰값
      .header('Content-Type', 'application/json')
      .requestBody(JSON.stringify(data))
      .ignoreContentType(true)
      .ignoreHttpErrors(true)
      .timeout(200000)
      .post();

    json = JSON.parse(response.text());
    result = json.choices[0].message.content;
  } catch (e) {
    result = '뭔가 잘못됐어요. 다시 시도해주세요.';
    Log.e(e);
  }
  return result;
}

function response(
  room,
  msg,
  sender,
  isGroupChat,
  replier,
  imageDB,
  packageName,
) {
  try {
    if (String(msg).includes('[나를 멘션] @모두봇')) {
      Log.i('room' + room);
      Log.i('sender', +sender);
      Log.i('isGroupChat', isGroupChat);
      if (msg.includes('랜덤문제')) {
        let response = org.jsoup.Jsoup.connect(
          'https://api.moducbt.com/zep/random-question/1',
        )
          .header('Content-Type', 'application/json')
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .get()
          .text();
        let db = DataBase.setDataBase('산업안전기사 필답형', response);
        replier.reply(JSON.parse(db).question['question']);
        return;
      }
      if (msg.includes('정답알려줘')) {
        let question = JSON.parse(
          DataBase.getDataBase('산업안전기사 필답형'),
        ).question;
        replier.reply(
          '[문제]\n' +
            question['question'] +
            '\n\n[정답]\n' +
            question['solution'] +
            '\n\n[출처]\n' +
            'https://moducbt.com/question/' +
            question['id'],
        );
        return;
      }
      if (msg.includes('질문')) {
        const result = getChatGPTResponse(
          removeFirstOccurrence(msg.replace('[나를 멘션] @모두봇', ''), '질문'),
        );
        replier.reply(room + '님의 질문에 대한 답변\n' + result);
        return;
      }
      if (msg.includes('/주식')) {
        const keyword = msg
          .replace('/주식', '')
          .replace('[나를 멘션] @모두봇', '');
        let response = org.jsoup.Jsoup.connect(
          'https://api.moducbt.com/stock?keyword=' + keyword,
        )
          .header('Content-Type', 'application/json')
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .get()
          .text();
        response = JSON.parse(response);
        const result =
          '종목명: ' +
          response['종목명'] +
          '\n' +
          '시가총액: ' +
          response['시가총액'] +
          '\n' +
          '현재가: ' +
          response['현재가'] +
          '\n' +
          '상승률: ' +
          response['상승률'] +
          '\n' +
          '고가: ' +
          response['고가'] +
          '\n' +
          '저가: ' +
          response['저가'] +
          '\n' +
          '거래량: ' +
          response['거래량'] +
          '\n' +
          replier.reply(result);
        return;
      }
      if (msg.includes('사랑')) {
        replier.reply('내가 더');
        return;
      }
      replier.reply(
        '안녕하세요. 모두봇입니다.\n\n' +
          '@모두봇 랜덤문제 : 랜덤문제를 생성합니다.\n\n' +
          '@모두봇 정답알려줘 : 직전에 생성된 랜덤문제의 답을 알려줍니다.' +
          '\n\n' +
          '@모두봇 질문 [질문]: 질문을 입력하면 답변을 해줍니다.' +
          '\n\n' +
          '@모두봇 /주식 [종목명] : 주식 정보를 알려줍니다.',
      );
    }
  } catch (e) {
    Log.i(e);
  }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText('Hello, World!');
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
