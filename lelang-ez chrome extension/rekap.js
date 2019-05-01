function hello() {
  chrome.tabs.executeScript({
    file: 'rekapFunction.js'
  }); 
}
document.getElementById("nowmate").addEventListener('click', hello);