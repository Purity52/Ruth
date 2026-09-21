const defaultData={
students:[
{matric:"CSC/2025/001",first:"John",middle:"",last:"Doe",gender:"Male",department:"Computer Science",level:"100"},
{matric:"IT/2025/002",first:"Mary",middle:"",last:"James",gender:"Female",department:"Information Technology",level:"200"}
],
departments:[
{name:"Computer Science",code:"CSC"},{name:"Information Technology",code:"IT"},{name:"Business Administration",code:"BAM"}
],
courses:[
{code:"CSC101",title:"Introduction to Computer Science",unit:3,department:"Computer Science"},
{code:"CSC102",title:"Introduction to Programming",unit:3,department:"Computer Science"}
],
results:[]
};
function getData(){let d=localStorage.getItem("sisData");if(!d){localStorage.setItem("sisData",JSON.stringify(defaultData));return structuredClone(defaultData)}return JSON.parse(d)}
function saveData(d){localStorage.setItem("sisData",JSON.stringify(d))}
function toggleSidebar(){document.getElementById("sidebar")?.classList.toggle("open")}
function logout(){sessionStorage.removeItem("sisLogin")}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function grade(n){return n>=70?"A":n>=60?"B":n>=50?"C":n>=45?"D":n>=40?"E":"F"}
function deleteItem(type,index){if(!confirm("Delete this record?"))return;let d=getData();d[type].splice(index,1);saveData(d);location.reload()}
function renderStudents(){let d=getData(),q=(document.getElementById("studentSearch")?.value||"").toLowerCase();let rows=d.students.filter(s=>(s.matric+" "+s.first+" "+s.last+" "+s.department).toLowerCase().includes(q));let el=document.getElementById("studentTable");if(!el)return;el.innerHTML=rows.map((s)=>{let i=d.students.indexOf(s);return `<tr><td>${esc(s.matric)}</td><td>${esc(s.first+" "+s.middle+" "+s.last)}</td><td>${esc(s.gender)}</td><td>${esc(s.department)}</td><td>${esc(s.level)}</td><td><button class="danger" onclick="deleteItem('students',${i})">Delete</button></td></tr>`}).join("")||'<tr><td colspan="6">No students found.</td></tr>'}
function renderDepartments(){let d=getData(),el=document.getElementById("departmentTable");if(!el)return;el.innerHTML=d.departments.map((x,i)=>`<tr><td>${esc(x.name)}</td><td><span class="badge">${esc(x.code)}</span></td><td><button class="danger" onclick="deleteItem('departments',${i})">Delete</button></td></tr>`).join("")}
function renderCourses(){let d=getData(),el=document.getElementById("courseTable");if(!el)return;el.innerHTML=d.courses.map((x,i)=>`<tr><td>${esc(x.code)}</td><td>${esc(x.title)}</td><td>${esc(x.unit)}</td><td>${esc(x.department)}</td><td><button class="danger" onclick="deleteItem('courses',${i})">Delete</button></td></tr>`).join("")}
function renderResults(){let d=getData(),el=document.getElementById("resultTable");if(!el)return;el.innerHTML=d.results.map((r,i)=>`<tr><td>${esc(r.student)}</td><td>${esc(r.course)}</td><td>${esc(r.session)}</td><td>${esc(r.semester)}</td><td>${esc(r.score)}</td><td><span class="badge">${grade(Number(r.score))}</span></td><td><button class="danger" onclick="deleteItem('results',${i})">Delete</button></td></tr>`).join("")||'<tr><td colspan="7">No results recorded.</td></tr>'}
function populateResultSelects(){let d=getData();let s=document.getElementById("resultStudent"),c=document.getElementById("resultCourse");if(s)s.innerHTML='<option value="">Select Student</option>'+d.students.map(x=>`<option>${esc(x.matric+" - "+x.first+" "+x.last)}</option>`).join("");if(c)c.innerHTML='<option value="">Select Course</option>'+d.courses.map(x=>`<option>${esc(x.code+" - "+x.title)}</option>`).join("")}
document.addEventListener("DOMContentLoaded",()=>{
let d=getData();
if(location.pathname.endsWith("dashboard.html")){document.getElementById("studentCount").textContent=d.students.length;document.getElementById("departmentCount").textContent=d.departments.length;document.getElementById("courseCount").textContent=d.courses.length;document.getElementById("resultCount").textContent=d.results.length}
let lf=document.getElementById("loginForm");if(lf)lf.addEventListener("submit",e=>{e.preventDefault();if(document.getElementById("username").value==="admin"&&document.getElementById("password").value==="admin123"){sessionStorage.setItem("sisLogin","1");location.href="dashboard.html"}else alert("Invalid username or password. Demo: admin / admin123")});
let sf=document.getElementById("studentForm");if(sf)sf.addEventListener("submit",e=>{e.preventDefault();let f=new FormData(sf),d=getData();d.students.push(Object.fromEntries(f));saveData(d);sf.reset();renderStudents();alert("Student saved successfully.")});
let df=document.getElementById("departmentForm");if(df)df.addEventListener("submit",e=>{e.preventDefault();let f=new FormData(df),d=getData();d.departments.push({name:f.get("name"),code:f.get("code")});saveData(d);df.reset();renderDepartments();alert("Department added.")});
let cf=document.getElementById("courseForm");if(cf)cf.addEventListener("submit",e=>{e.preventDefault();let f=new FormData(cf),d=getData();d.courses.push({code:f.get("code"),title:f.get("title"),unit:f.get("unit"),department:f.get("department")});saveData(d);cf.reset();renderCourses();alert("Course added.")});
let rf=document.getElementById("resultForm");if(rf)rf.addEventListener("submit",e=>{e.preventDefault();let f=new FormData(rf),d=getData();d.results.push({student:f.get("student"),course:f.get("course"),session:f.get("session"),semester:f.get("semester"),score:f.get("score")});saveData(d);rf.reset();populateResultSelects();renderResults();alert("Result saved.")});
renderStudents();renderDepartments();renderCourses();populateResultSelects();renderResults();
});
