let classifier;

const preloadStuff = () => {
  const loaded = () => console.log('Model loaded!')
  const pluginready = () => console.log('jQuery plugin loaded.')
  const setModel = () => {
    classifier = ml5.imageClassifier('http://localhost:3000/model.json', loaded)
  }
  $.ajax({
    url: 'https://unpkg.com/ml5@0.4.3/dist/ml5.min.js',
    dataType: "script",
    success: setModel,
    headers: {'X-Foo': 'bar', 'Access-Control-Allow-Origin': "*"}
  });
  $.ajax({
    url: 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js',
    dataType: "script",
    success: pluginready,
    headers: {'X-Foo': 'bar', 'Access-Control-Allow-Origin': "*"}
  });
}

const beatCapteha = data => {
  let finished = 0;
  let types = data.select_type.replace('and ', '').split(',').map(s => s.trim());
  let answers = [];
  for (let image of data.images) {
    let id = image.uuid;
    classifier.classify(document.getElementById(id), (err, results) => {
      if (types.includes(results[0].label)) {
        $(`#${id}`).addClass('selected');
        answers.push(id);
      }
    })
    .then(() => {
      finished++;
      if (finished === 100) {
        console.log(`Sending ${answers.length} answers.`)
        submit_answers(answers.join(','))
      }
    });
  }
}

const spam = async () => {
  const postdata = {
    'favorites': 'Cupid Crunch',
    'age': 190,
    'about': 'Yum',
    'email': 'elfelfinson1@elfu.edu.org', // enter your email here
    'name': 'Elf Elfinson'
  }
  for (let i = 0; i < 100; i++) {
    await $.post( "api/entry", postdata, data => {
      if (data.request) {
        $('#main_content').html(data.data);
        $( "#result_header" ).fadeIn(2000, () => {});
      } else {
        $('#submiterror').text(data.data);
      }
    }).done(() => console.log('entry sent'))
  }
}

// ============ OVERRIDE FUNCTIONS FROM SOURCE =====================

build_images = data => {
  var html="";
  for (var i=0; i<data.images.length; i++) {
    html += '<img height="auto" id="'+data.images[i].uuid+'" src="data:image/png;base64,'+data.images[i].base64+'" class="reCAPTEHAimages"/>'
  }
  $('#capteha_modal_images').html(html);
  $('#imagetype').text(data.select_type);
  $('#capteha_modal_images').imagesLoaded(() => { // use the jQuery plugin we loaded
    console.log('All images successfully loaded.');
    beatCapteha(data);
  });
}

hide_capteha = () => {
  if ($("#capteha_modal").css('display') == 'block') {
     $("#capteha_modal" ).fadeOut(100, () => {
       $('#capteha_modal_submit').css('display','block');
       $('.selected').removeClass('selected');
       $('.correctImage').removeClass('correctImage');
       $('.incorrectImage').removeClass('incorrectImage');
       $('.reCAPTEHAimages').remove();
    });
  }
}

submit_answers = (answers='') => {
  $.post( "api/capteha/submit", { 'answer': answers }, data => {
    $('#timer').text(data.data); // display server response
    if (data.request) {
      $('#box-1').prop( "checked", true );
      setTimeout(() => hide_capteha(), 2000);
    }
  })
}

decrement = () => {
  if ($("#capteha_modal").css('display') == 'block') {
    let time = $('#timer').text();
    if (parseInt(time)) {
      time = parseInt($('#timer').text())-1;
    }
    $('#timer').text(time);
    if (time > 0) {
      setTimeout(() => decrement(), 1000);
    } else {
      setTimeout(() => hide_capteha(), 2000);
    }
  }
}

preloadStuff(); // do the preload
