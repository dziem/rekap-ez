var execTime = 60000; //satuan mili second, set waktu open foto per item bersadarkan performa pc dan internet, karena harus keload sepenuhnya agar dapat terambil data nya
var skipFirstItem = true; //skip item pertama, set ke false agar tidak skip
if(skipFirstItem){
  var i = 1;
  addedTime = 0;
}else{
  var i = 0;
  addedTime = 1;
 }
function arrayToCSV (twoDiArray) {
    //  Modified from: http://stackoverflow.com/questions/17836273/
    //  export-javascript-data-to-csv-file-without-server-interaction
    var csvRows = [];
    for (var i = 0; i < twoDiArray.length; ++i) {
        for (var j = 0; j < twoDiArray[i].length; ++j) {
            twoDiArray[i][j] = '\"' + twoDiArray[i][j] + '\"';  // Handle elements that contain commas
        }
        csvRows.push(twoDiArray[i].join(','));
    }

    var csvString = csvRows.join('\r\n');
    var a         = document.createElement('a');
    a.href        = 'data:attachment/csv,' + csvString;
    a.target      = '_blank';
    a.download    = 'rekap.csv';

    document.body.appendChild(a);
    a.click();
    // Optional: Remove <a> from <body> after done
}

function myLoop (panjang) {           //  create a loop function
	setTimeout(function () {
        linkitem[i] = items[i].querySelectorAll('[href]');
		links[i] = linkitem[i][0].getAttribute('href');
		var popup = window.open(links[i], '_blank', 'width=500,height=500');
		setTimeout(function(){
			openmate(popup,i)
		}, execTime);
		setTimeout(function() {
			readmate(i);	
		}, (execTime + 1000));          //  your code here
		i++;                     //  increment the counter
		if (i < panjang) {            //  if the counter < 10, call the loop function
			myLoop(panjang);             //  ..  again which will trigger another 
		}                        //  ..  setTimeout()
   }, (execTime + 2000))
}
function openmate(popup,i){
	popupPage[i]=popup.document;
	popup.close();
}
function readmate(i){
	var baris = [];
	var captionContainer = popupPage[i].getElementById('fbPhotoSnowliftCaption');
	var captionContent = captionContainer.getElementsByClassName('hasCaption');
	baris.push(captionContent[0].firstChild.data);
	var commentContainer = popupPage[i].getElementsByClassName('_77bp');
	var commentCount = commentContainer[0].getElementsByClassName('_6qw4').length;
	var winner = '';
	var bidValue = '';
	var bidd = '';
	for (var j = commentCount - 1;j>0;j--){
		bidd = commentContainer[0].getElementsByClassName('_3l3x')[j].firstElementChild.innerHTML;
		if(!isNaN(bidd)){
			winner = commentContainer[0].getElementsByClassName('_6qw4')[j].innerHTML;
			bidValue = bidd;
			break;
		}else{
			if(bidd.toLowerCase() == 'bin'){
				winner = commentContainer[0].getElementsByClassName('_6qw4')[j].innerHTML;
				bidValue = bidd;
				break;
			}
		}
	}
	baris.push(winner);
	baris.push(bidValue);
	rekaps.push(baris);
}
var items = document.getElementsByClassName(" _2eea");
var linkitem = [];
var links = [];
var popupPage = [];
var rekaps = [];
rekaps.push(['Item','Nama','Nilai Bid']);
var banyakItem = items.length;
myLoop(banyakItem);
setTimeout(function() {
	arrayToCSV(rekaps);
}, ((banyakItem + addedTime) * (execTime + 2000))+1000);
