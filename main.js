// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//Factory
const pAequorFactory = (num, arrDna) =>{
  return{
    specimenNum: num,
    dna: arrDna,

    mutate(){
      //Get index, and value of random base
      const randBaseIndex = Math.floor(Math.random() * 15);
      const randBaseValue = this.dna[randBaseIndex];

      //Remove the random base from the bases
      const dnaBases = ['A', 'T', 'C', 'G'];
      dnaBases.splice(dnaBases.indexOf(randBaseValue), 1);

      //Replace value of random index with one random value from the dna bases
      this.dna[randBaseIndex] = dnaBases[Math.floor(Math.random() * 3)];

      return this.dna;
    },

    compareDNA(pAequor){
      const parts = 15;
      let matchCount = 0;
      for(let i = 0; i < pAequor.dna.length; i++){
        if(pAequor.dna[i] === this.dna[i]){
          matchCount++;
        }
      };

      const matchPercent = (matchCount / parts) * 100;

      /*console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(matchPercent*10)/10}% DNA in common`);*/

      return Math.round(matchPercent * 10) / 10
    },

    willLikelySurvive(){
      //60% of 15 bases is 9
      let cgCount = 0;
      const survivalCount = (60/100) * 15; //9

      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          cgCount++;
        }
      }

      return cgCount >= survivalCount ? true: false;
    },

    complementStrand(){
      let compDNAStarnd = this.dna.concat();//Shallow copy
      for(let i = 0 ; i < this.dna.length; i++){
        switch(compDNAStarnd[i]){
          case 'A':
            compDNAStarnd[i] = 'T';
            break;
          case 'T':
            compDNAStarnd[i] = 'A';
            break;
          case 'C':
            compDNAStarnd[i] = 'G';
            break;
          case 'G':
            compDNAStarnd[i] = 'C';
            break;
        }
      }

      return compDNAStarnd;
    }
  };
}

//1. Test object creation
console.log('---------Object creation---------');
const dnaBase1 = ['A', 'C', 'T', 'G','A', 'C', 'T', 'G','A', 'C', 'T', 'G','A', 'C', 'T'];
const pAequor1 = pAequorFactory(1, dnaBase1);
console.log(pAequor1);

//2. Test object mutation
console.log('\n---------Object mutation----------');
console.log(pAequor1.mutate());

//3. Test object comparision by creating another object
console.log('\n-------Compare two objects--------');
const dnaBase2 = ['A', 'C', 'T', 'G','A', 'C', 'T', 'G','A', 'C', 'T', 'G','A', 'C', 'T'];
const pAequor2 = pAequorFactory(2, dnaBase2);
//gives (14/15) * 100 = 93.3%, cz pAequor1 has been mutated once, which makes it different from pAequor2.
console.log(`P. Aequor #${pAequor1.specimenNum}: ${pAequor1.dna.join(',')}\nP. Aequor #${pAequor2.specimenNum}: ${pAequor2.dna.join(',')}`)
//pAequor2.compareDNA(pAequor1);
console.log(`Specimen #${pAequor2.specimenNum} and specimen #${pAequor1.specimenNum} have ${ Math.round(pAequor2.compareDNA(pAequor1) * 10) / 10 }% DNA in common`);

//4. Test if P. aequor is will likely to survive
console.log('\n-------Will likely survive--------');
const dnaBase3 = ['A', 'C', 'C', 'C','A', 'C', 'T', 'C','A', 'C', 'T', 'C','A', 'C', 'C'];
const pAequor3 = pAequorFactory(3, dnaBase3);
console.log(`P. Aequor with dna ${pAequor3.dna.join(',')} will likely survive: ${pAequor3.willLikelySurvive()}`);//True - (9 C's)

//5. Test 30 sample objects creation for team study
console.log('\n--------Create 30 instances-------');
const samplePAequors = [];
const instancesCount = 30;
let dnaBase = [];
let pAequor = {};
let pAequorID = 1;

while(samplePAequors.length < instancesCount){
  dnaBase = mockUpStrand();
  pAequor = pAequorFactory(pAequorID, dnaBase);
  if(pAequor.willLikelySurvive()){
    samplePAequors.push(pAequor);
    pAequorID++;
  }
}

console.log(`Created instances: ${samplePAequors.length}`);
//console.log(samplePAequors);

//6. Test complimentary dna starand
console.log('\n-----Complimentary DNA strand-----');
//Lets take instance pAequor1 for example
console.log(`Initial DNA:\n ${pAequor1.dna.join(',')}`);
console.log(`Compliment DNA:\n ${pAequor1.complementStrand().join(',')}`);

//7. Test compare two most related instance out of 30 sample
console.log('\n-----Most related instances-----');
const comparisionResult = [];
//To use compareDNA() the function must return a value
let maxMatchObjects = [];
let currentMatchvalue = 0;
let maxMatchValue = 0;
for(let i = 0; i < samplePAequors.length; i++){
  for(let j = i + 1; j < samplePAequors.length; j++){
    currentMatchvalue = samplePAequors[i].compareDNA(samplePAequors[j]);
    if(currentMatchvalue > maxMatchValue){
      maxMatchValue = currentMatchvalue;
      maxMatchObjects[0] = samplePAequors[i].specimenNum;
      maxMatchObjects[1] = samplePAequors[j].specimenNum;
    }
    //console.log(samplePAequors[i].specimenNum + ':' + samplePAequors[j].specimenNum + ':' + currentMatchvalue)
  }
}

const matchedObjects = samplePAequors.filter(pAequor =>{
  return maxMatchObjects.some(objId =>{
    return objId === pAequor.specimenNum;
  })
})

matchedObjects.forEach(obj =>{
  console.log(`ID: ${obj.specimenNum}  DNA: ${obj.dna.join(',')}`);
})

console.log(`Match Value: ${maxMatchValue}%`);

