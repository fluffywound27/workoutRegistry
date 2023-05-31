const sessionTitleInput = document.querySelector('#js-session-name-input');
let formWrapperElement = document.querySelector('#js-form-wrapper');
const newSessionBtnElement = document.querySelector('#js-new-session-btn');
const addBtnElement = document.querySelector('#js-add-btn');
const saveBtnElement = document.querySelector('#js-save-btn');
const resetDataBtn = document.querySelector('#js-reset-data-btn');
let savedWorkoutObj = {
  exercises: [],
  weights: [],
  sets: []
};

//real time display
formWrapperElement.innerHTML = localStorage.getItem('tempSavedProgress') || '';
sessionTitleInput.value = localStorage.getItem('sessionSavedTitle') || '';
renderCurrentData();
enableRemoveBtns();

//event listeners

newSessionBtnElement.addEventListener('click', () => {
  formWrapperElement.innerHTML = '';
  sessionTitleInput.value = '';
  localStorage.removeItem('tempSavedProgress');
  localStorage.removeItem('sessionSavedTitle');
})

addBtnElement.addEventListener('click', () => {
  createNewExercise();
  enableRemoveBtns();
});

saveBtnElement.addEventListener('click', saveProgress);

resetDataBtn.addEventListener('click', () => {
  localStorage.clear();
  alert('Data erased')
  formWrapperElement.innerHTML = '';
  sessionTitleInput.value = '';
});

//functions

function createNewExercise() {
  //main body
  const formBodyElement = Object.assign(document.createElement('div'), {
    id: 'js-form-body',
    className: 'form-body',
  });
  formWrapperElement.appendChild(formBodyElement);
  //exercise text
  const exerciseElement = Object.assign(document.createElement('h3'), {
    id: 'js-exercise',
  });
  exerciseElement.innerHTML = 'Exercise';
  formBodyElement.appendChild(exerciseElement);
  //exercise input
  const exerciseInputElement = Object.assign(document.createElement('input'), {
    id: 'js-exercise-input',
    className: 'exercise-input',
    type: 'text',
    placeholder: 'E.g. Curl ups'
  });
  formBodyElement.appendChild(exerciseInputElement);
  //weight text
  const weightElement = Object.assign(document.createElement('h3'), {
    id: 'js-weights',
  });
  weightElement.innerHTML = 'Weight';
  formBodyElement.appendChild(weightElement);
    //weight input
  const weightInputElement = Object.assign(document.createElement('input'), {
    id: 'js-weight-input',
    className: 'weight-input',
    type: 'text',
    placeholder: 'E.g. 30lbs'
  });
  formBodyElement.appendChild(weightInputElement);
  //set text
  const setElement = Object.assign(document.createElement('h3'), {
    id: 'js-sets',
  });
  setElement.innerHTML = 'Sets';
  formBodyElement.appendChild(setElement);
    //set input
    for (let i = 0; i < 3; i++) {
  const setInputElement = Object.assign(document.createElement('input'), {
    id: 'js-set-input',
    className: 'set-input',
    type: 'text',
    placeholder: 'Reps'
  })
  formBodyElement.appendChild(setInputElement);
  }
  //remove btn
  const removeBtnDivElement = document.createElement('div');
  formBodyElement.appendChild(removeBtnDivElement);
  const removeBtnElement = Object.assign(document.createElement('button'), {
    id: 'js-remove-btn',
    className: 'remove-btn'
  });
  removeBtnElement.innerHTML = 'Remove'
  removeBtnDivElement.appendChild(removeBtnElement);
};

function enableRemoveBtns() {
  const formBodyList = document.querySelectorAll('#js-form-body');
  const removeBtnList = document.querySelectorAll('#js-remove-btn');

  removeBtnList.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      formWrapperElement.removeChild(formBodyList[index]);
    })
  })
};

//values for saveProgress to work

let savedWorkouts = JSON.parse(localStorage.getItem('savedWorkoutsArray')) || [];

function saveProgress() {
  localStorage.setItem('tempSavedProgress', formWrapperElement.innerHTML); //saves the form
  localStorage.setItem('sessionSavedTitle', sessionTitleInput.value); //saves the title

  if (sessionTitleInput.value === '') { //this makes sure title field is not empty
    alert('Sorry, session title needs to have a name');
  } else if (formWrapperElement.innerHTML === '') {
    alert('No session information to save');
  } else if (savedWorkouts.indexOf(sessionTitleInput.value) === -1) { //makes sure array wont have duplicate names.
    savedWorkouts.push(sessionTitleInput.value); //if its not found it will push it in
  } else {
  const exerciseInputs = document.querySelectorAll('#js-exercise-input');
  const weightInputs = document.querySelectorAll('#js-weight-input');
  const setInputs = document.querySelectorAll('#js-set-input');

  savedWorkoutObj = {
    exercises: [],
    weights: [],
    sets: []
  };

  exerciseInputs.forEach(exElem => {
    savedWorkoutObj['exercises'].push(exElem.value);
  });

  weightInputs.forEach(weElem => {
    savedWorkoutObj['weights'].push(weElem.value)
  });

  setInputs.forEach(seElem => {
    savedWorkoutObj['sets'].push(seElem.value)
  });
  localStorage.setItem(`${sessionTitleInput.value}`, JSON.stringify(savedWorkoutObj));
  console.log('passed');
  }
    localStorage.setItem('savedWorkoutsArray', JSON.stringify(savedWorkouts)); //adds name of session to an array and store it into an array for share use between sites
};

function renderCurrentData() {

  const savedWorkoutObj = JSON.parse(localStorage.getItem(`${sessionTitleInput.value}`))

  const exerciseInputs = document.querySelectorAll('#js-exercise-input');
  const weightInputs = document.querySelectorAll('#js-weight-input');
  const setInputs = document.querySelectorAll('#js-set-input');

  exerciseInputs.forEach((elem, index) => {
    elem.value = savedWorkoutObj.exercises[index];
  });

  weightInputs.forEach((elem, index) => {
    elem.value = savedWorkoutObj['weights'][index];
  });

  setInputs.forEach((elem, index) => {
    elem.value = savedWorkoutObj['sets'][index];
  });
};