import cities from './cities.js';

const searchInput=document.getElementById('loc');

const searchWrapper=document.querySelector('.wrapper');
const resultWrapper=document.querySelector('.results');


searchInput.addEventListener('keyup',(e)=>{
	console.log(e.target.value);
	// or just simply searchInput.value
	// console.log(searchInput.value);
	
	let results=[];
	let input=searchInput.value;
	
	if(input.length){
		
		results=cities.filter((item)=>{
			return item.toLowerCase().includes(input.toLowerCase());
		})
		
		renderResults(results);	
	}else{
		searchWrapper.classList.remove('show');
	}
});

resultWrapper.addEventListener('click',()=>{
	searchWrapper.classList.remove('show');
})


function renderResults(result){

	if(!result.length){
		return searchWrapper.classList.remove('show');
	}
	
	let content="";
	for(let i=0;i<Math.min(5,result.length);i++){
		content+=(`<li>${result[i]}</li>`);
	}
	// console.log(content);
	
	searchWrapper.classList.add('show');
	resultWrapper.innerHTML=`<ul> ${content} </ul>`
	
	const searchResults=document.querySelectorAll('.results ul li');
	searchResults.forEach((result)=>{
		result.addEventListener('click',()=>{
			const content=result.textContent;
			searchInput.value=content;
			console.log(content);
	
		});
	});
	
}