
var fN = ['Maria', 'Matilde', 'Leonor', 'Mariana', 'Carolina', 'Beatriz', 'Ana', 'João', 'Rodrigo','Martim', 'Francisco', 'Santiago', 'Tomás', 'Guilherme'];
var lN = ['Silva','Santos','Pereira', 'Ferreira', 'Costa', 'Oliveira', 'Martins'];
var spec = ['Clínica Geral','Psiquiatria','Pediatria','Cardiologia','Ortopedia','Neurocirurgia'];
var medicalActs = ['consulta','raio-X','tomografia', 'exame','cirurgia','transfusão','ecograma']
var cost = [50,100,150,75,5000,1000,200];
var rmb = [1.00, 0.80, 0.50, 0.20];
var dates = [];

// DESC TEXTUAL de POLITICAS
var pol = ['gratuita', 'comparticipada','apoiada', 'limitada'];


// DESC TEXTUAL de STATUS
var status = ['REQUESTED', 'PENDING','ACCEPTED', 'REJECTED'];

const NUM_PROF = 10;
const NUM_PATS = 20;
const NUM_ACTS_PER_PAT = 5;
const NUM_REQUESTS = NUM_PATS * NUM_ACTS_PER_PAT;

var doctors = [], mediators=[], patients=[], acts=[];
var actsRmb=[], actsRmbVerbose=[];
var reports =[];
var requests= [], requestsVerbose=[];

// UTILS

function rA(ar)
{
  return ar[Math.floor(Math.random()*ar.length)];
}

function rID(ar)
{
  return Math.floor(Math.random()*ar.length);
}

function rI(lim)
{
  return Math.floor(Math.random()*lim)+1;
}

function get_reimb_poltype(patID, actID)
{
  var pol_type = patients[patID].policy_type;
  return rmb[pol_type];
}

function RDate()
{
  return rI(29)+'/'+rI(12)+'/'+ (2000 + rI(15));
}

// DATA GENERATION

// generate doctors
for (var i=0; i < NUM_PROF; i++)
{
  var fn = rA(fN), ln = rA(lN);
  doctors.push(
    { docID : i, name : fn + ' ' + ln, speciality : rA(spec), user : 'doc'+i , pass : 'pass'}
  );
}

// generate mediators
for (var i=0; i < NUM_PROF; i++)
{
  var fn = rA(fN), ln = rA(lN);
  mediators.push(
    { medID : i, name : fn + ' ' + ln, user : 'med'+i , pass : 'pass'}
  );
}

// generate patients
for (var i=0; i < NUM_PATS; i++)
{
  var fn = rA(fN), ln = rA(lN);
  patients.push(
    { patID : i, name : fn + ' ' + ln, policy_number : 1000+i, policy_type : rID(pol) }
  );
}

// generate medicalActs
for (var i=0; i < medicalActs.length; i++)
{
  acts.push(
    { actID : i, name : medicalActs[i], cost : cost[i]}
  );
}

// generate medicalActs Reimbursements numerico
for (var i=0; i < medicalActs.length; i++)
{
  for (var j=0; j < pol.length; j++)

  actsRmb.push(
    { actID : i, policy_type : j , reimb_percentage : rmb[j]}
  );
}


// generate medicalActs Reimbursements verboso textual
for (var i=0; i < medicalActs.length; i++)
{
  for (var j=0; j < pol.length; j++)

  actsRmbVerbose.push(
    { actID : i, policy_type : pol[j] , reimb_percentage : rmb[j]}
  );
}


// generate medicalActs Reports
for (var i=0; i < NUM_PATS; i++)
{
  for (var j=0, rep=0; j < NUM_ACTS_PER_PAT; j++, rep++)
  {
    actID = rID (acts);

  reports.push(
    { repID : rep, date : RDate(), docID: rID (doctors),
      patID : i, actID: actID, actual_reimb_perc : get_reimb_poltype(i, actID)}
  );
  }
}


// generate Reimbursement Requests com status textual
for (var i=0; i < NUM_REQUESTS; i++)
{
  requests.push(
    {reqID : i, repID: NUM_REQUESTS-i-1, status: rA(status)}
  );
}


// generate Reimbursement Requests
for (var i=0; i < NUM_REQUESTS; i++)
{
  requestsVerbose.push(
    {reqID : i, repID: NUM_REQUESTS-i-1, status: rID(status)}
  );
}


// DATA OUTPUT

console.log(doctors);
console.log(mediators);
console.log(patients);
console.log(acts);
console.log(actsRmb);

// descrição de actos com policy type textual e não indexavel por patiente
console.log(actsRmbVerbose);

console.log(reports);




// descrição de requets com status textual
console.log(requestsVerbose);

console.log(requests);
