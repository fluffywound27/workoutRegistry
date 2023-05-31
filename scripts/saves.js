const savedFilesContainerElement = document.querySelector('#js-saved-files');
let savedWorkouts = JSON.parse(localStorage.getItem('savedWorkoutsArray')) || [];
const resetDataBtn = document.querySelector('#js-reset-data-btn');

renderSavesList();
enableRemoveBtns();
enableLinks();

resetDataBtn.addEventListener('click', () => {
  localStorage.clear();
  alert('Data erased')
  savedFilesContainerElement.innerHTML = '';
});

//functions
function renderSavesList() {
  savedWorkouts.forEach((element, index) => {
    //creates container of indexed element for listing
    const savedItemElement = Object.assign(document.createElement('div'), {
      id: 'js-saved-item',
      className: 'saved-item'
    });
    savedFilesContainerElement.appendChild(savedItemElement);
    //create link to index element
    const savedItemLinkElement = document.createElement('a');
    savedItemLinkElement.setAttribute('id', 'js-link');
    savedItemLinkElement.setAttribute('href', 'display.html')
    savedItemLinkElement.innerHTML = element;
    console.log(savedItemLinkElement);
    savedItemElement.appendChild(savedItemLinkElement);
    //create remove button 
    const savedItemRemoveElement = Object.assign(document.createElement('button'), {
      id: 'js-remove-btn',
      className: 'remove-btn'
    });
    savedItemRemoveElement.innerHTML = 'Remove';
    savedItemElement.appendChild(savedItemRemoveElement);
  });
};

function enableRemoveBtns() {
  const savedItemsList = document.querySelectorAll('#js-saved-item');
  const removeBtnList = document.querySelectorAll('#js-remove-btn');

  removeBtnList.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      savedFilesContainerElement.removeChild(savedItemsList[index]);
      savedWorkouts.splice(index, 1);
      localStorage.setItem('savedWorkoutsArray', JSON.stringify(savedWorkouts));
    })
  })
};

function enableLinks() {
  const linkElementList = document.querySelectorAll('#js-link');

  linkElementList.forEach(elem => {
    elem.addEventListener('click', () => {
      localStorage.setItem('saveDisplay', elem.innerHTML);
      console.log('passed');
    })
  })
};