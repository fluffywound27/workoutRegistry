const contentWrapper = document.querySelector('#js-wrapper');
const pageTitle = document.querySelector('#js-session-name');

let saveToDisplay = localStorage.getItem('saveDisplay');
let saveToRender = JSON.parse(localStorage.getItem(`${saveToDisplay}`));

pageTitle.innerHTML = `${saveToDisplay}`;
createDataForms();
renderData();

function createDataForms() { //depending on how many exercises were saved, it will create the correct amount of forms to render the data
for (let i = 0; i < saveToRender['exercises'].length; i++) {
  //create form body
  const bodyElement = document.createElement('div');
  bodyElement.setAttribute('id', 'js-form-body');
  bodyElement.setAttribute('class', 'form-body');
  contentWrapper.appendChild(bodyElement);
  //create exercise title h3
  const exerciseName = Object.assign(document.createElement('h3'), {
    id: 'js-exercise',
    className: 'exercise'
  });
  exerciseName.innerHTML = 'Exercise';
  bodyElement.appendChild(exerciseName);
  //create p element to render exercise title
  const exerciseData = Object.assign(document.createElement('p'), {
    id: 'js-exercise-data',
    className: 'exercise-data'
  });
  bodyElement.appendChild(exerciseData);
  //create weight (title) of exercise h3
  const weightName = Object.assign(document.createElement('h3'), {
    id: 'js-weights',
    className: 'weights'
  });
  weightName.innerHTML = 'Weight';
  bodyElement.appendChild(weightName);
  //create p element to render weight data
  const weightData = Object.assign(document.createElement('p'), {
    id: 'js-weight-data',
    className: 'weight-data'
  });
  bodyElement.appendChild(weightData);
  //create set title 
  const setName = Object.assign(document.createElement('h3'), {
    id: 'js-sets',
    className: 'sets'
  });
  setName.innerHTML = 'Sets'
  bodyElement.appendChild(setName);
  //creates container for sets data
  const setContainerElement = document.createElement('div');
  setContainerElement.setAttribute('id', 'js-set-data');
  setContainerElement.setAttribute('class', 'set-data');
  contentWrapper.appendChild(setContainerElement);
  //create p elements to render rep data 
  for (let i = 0; i < 3; i++) {
  const repData = Object.assign(document.createElement('p'), {
    id: 'js-rep-data',
    className: 'rep-data'
  });
  setContainerElement.appendChild(repData);
}}};

function renderData() {

  const exerciseList =  document.querySelectorAll('#js-exercise-data');
  const weightList =  document.querySelectorAll('#js-weight-data');
  const repList =  document.querySelectorAll('#js-rep-data');

  exerciseList.forEach((elem, index) => {
    elem.innerHTML = saveToRender.exercises[index];
  })

  weightList.forEach((elem, index) => {
    elem.innerHTML = saveToRender.weights[index];
  })

  repList.forEach((elem, index) => {
    elem.innerHTML = saveToRender.sets[index];
  })
};