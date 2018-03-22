function initMindMap(list = similarWords.map(value => ({ name: value.text }))) {
  const field = $('#mind-field');
  field.empty();

  $('#main-word').text(topicWord);

  let i = 0;
  for (const item of list) {
    const html = `<button id="item-${item.name}" class="child z-depth-3 waves-effect waves-light btn btn-floating btn-large blue">${item.name}</button>`;
    const line = `<a id="line-${item.name}" style="background-color: black;"></a>`;
    field.append(html);
    field.append(line);

    const listener = (i, item) => function () {
      const unit = $('#mind-field').width() / 2;
      const coord = getCoord(unit / 2 + Math.random() * (unit / 6), 60 * i + Math.random() * 30);

      const element = $(`#item-${item.name}`);
      element.click(() => {
        Materialize.toast('검색 중... 잠시만 기다려 주세요.', 1000);

        topicWord = item.name;
        console.log(topicWord);

        $('#content').empty();
        $('#content').load('./list.html');
        setTimeout(() => {
          similarWords = model.analogy({ positive: [topicWord] }, 6);

          initList();
        }, 200);
      });

      const line = $(`#line-${item.name}`);
      element.offset({
        top: unit + coord.y + 72,
        left: unit + coord.x - 32,
      });
      setLine(line, unit, unit, unit + coord.x, unit + coord.y);
    };

    $(window).resize(listener(i, item));

    listener(i, item)();
    i++;
  }
}

$('#main-word').click(() => {
  $('#content').empty();
  $('#content').load('./list.html');

  Materialize.toast('검색 중... 잠시만 기다려 주세요.', 1000);
  setTimeout(() => {
    similarWords = model.analogy({ positive: [topicWord] }, 6);

    initList();
  }, 200);
});

function setLine(element, x1, y1, x2, y2) {
  let a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);

  let sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;

  let x = sx - c / 2,
    y = sy;

  x -= 12;
  y += 0;

  const alpha = Math.PI - Math.atan2(-b, a);

  const styles = `${'border: 1px solid #eeeeee; '
    + 'width: '}${c}px; `
    + 'height: 0px; '
    + `-webkit-transform: rotate(${alpha}rad); `
    + 'position: absolute; '
    + `top: ${y}px; `
    + `left: ${x}px; `;
  element.attr('style', styles);
}

function getCoord(radius, angle) {
  const x = Math.round(radius * Math.cos(angle / 180 * Math.PI));
  const y = Math.round(radius * Math.sin(angle / 180 * Math.PI));

  return { x, y };
}
