import catsData from "./data.js";


// The element where I hold all my radio inputs
const emotionRadios = document.getElementById('emotion-radios');
// Grab the Get Image button
const getImageBtn = document.getElementById('get-image-btn');
// Check if the Animated GIF, is checked so that I can filter the radio
const gifsOnlyOption = document.getElementById('gifs-only-option');

// Getting control off all what I need to display the image
const memeModal = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');

// Getting the button for closing the modal
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');



// Listen for checking radio emoji
emotionRadios.addEventListener('change', highlightCheckedOption);

// Listen for closing Modal
memeModalCloseBtn.addEventListener('click', closeModal);

// Listen for the click on the Getting Image
getImageBtn.addEventListener('click', renderCat);


function highlightCheckedOption(e) {
    // Remove all the highlight class that left when I switch to another radio
    const radios = document.getElementsByClassName('radio');
    for(let radio of radios) {
        radio.classList.remove('highlight');
    }

    // Add the highlight class to the radio that I jump to
    document.getElementById(e.target.value).parentElement.classList.add('highlight');
}


function closeModal() {
    memeModal.style.display = 'none';
}


function renderCat(){
    // Getting the object
    const catObject = getSingleCatObject();
    // Display the data of the object to the DOM
    memeModalInner.innerHTML = `
        <img 
            class="cat-img" 
            src="./images/${ catObject.image }"
            alt="${ catObject.alt }"
        />
    `;

    // Display the div memeModal to see
    memeModal.style.display = 'flex';
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1) {
        return catsArray[0];

    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}


function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const isGif = gifsOnlyOption.checked;

        // Getting a new array of cats, that has a specefic emotion
        const matchingCatsArray = catsData.filter( cat => {
            if(isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;

            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        });

        return matchingCatsArray;
    }
}




function getEmotionsArray(cats) {
    const emotionsArray = [];
    for(let cat of cats) {
        for(let emotion of cat.emotionTags) {
            // I am checking my array before inserting, to aviod duplicate value
            !emotionsArray.includes(emotion) && emotionsArray.push(emotion)
        }
    }
    return emotionsArray;
}


function renderEmotionsRadios(cats) {
    let radioItems = '';
    // Store all the emotions in this array
    const emotions = getEmotionsArray(cats);
    
    for(let emotion of emotions) {
        radioItems += `
            <div class='radio'>
                <label for=${ emotion }>${ emotion }</label>
                <input 
                    type='radio'
                    name='emotion'
                    value=${ emotion }
                    id=${ emotion }
                />
            </div>
        `;
    }

    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData);
