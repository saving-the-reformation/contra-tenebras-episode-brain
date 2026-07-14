import { startSync, saveWorkspace } from "./sync.js";

const initialEpisodes = [
  {
    id: "ep-1",
    number: 1,
    title: "Fulgentius of Ruspe and the Priority of Grace",
    shortTitle: "Fulgentius and Grace",
    description: "Faith, the beginning of good will, perseverance, and final glorification as gifts grounded in God’s antecedent grace and eternal purpose.",
    status: "Script drafted",
    thesis: "Fulgentius of Ruspe presents faith, the beginning of the good will, perseverance, and final glorification as gifts grounded in God’s antecedent grace and eternal purpose. He does so not as an isolated theologian but as spokesman for the institutional North African church — fifteen exiled bishops who endorsed his positions — and as a thinker who arrived at these conclusions through a documented conversion away from a broader construal of God’s saving will.",
    needs: ["Keep the episode near 15 minutes.", "Use direct evidence before interpretation.", "Show the institutional weight of the fifteen bishops.", "Explain moral asymmetry: God gives grace but is not the author of evil.", "Make the Reformed connection carefully, without calling Fulgentius a proto-Calvinist."],
    segments: [
      ["Hook — Who Said It?", "Open with the faith-as-gift quotation, then reveal the sixth-century African bishops.", "0:00–1:15"],
      ["Context — Man, Exile, Conversion", "Biography, Vandal exile, episcopal authority, and his change on God’s saving will.", "1:15–3:30"],
      ["Grace Begins", "Grace precedes, accompanies, and follows; Proverbs 8:35 in the African reception.", "3:30–5:30"],
      ["Grace Vivifies", "The soul does not give itself faith; the Scythian connection and the bishops’ formulation.", "5:30–8:00"],
      ["Grace Completes", "Perseverance and glorification within the unchangeable order of divine work.", "8:00–10:00"],
      ["The Guardrail", "Moral asymmetry, concupiscence, just judgment, and God not authoring evil.", "10:00–12:00"],
      ["The Exegetical Move", "Fulgentius on 1 Timothy 2:4 and the meaning of ‘all.’", "12:00–13:15"],
      ["Synthesis", "Four conclusions, North African roots, and the bridge toward the Scythian monks.", "13:15–15:00"]
    ]
  },
  {id:"ep-2",number:2,title:"The Scythian Monks — Christology and the Grace Connection",shortTitle:"The Scythian Monks",description:"The men whose questions produced the letters: their Christology, doctrine of grace, and why they believed the two belonged together.",status:"Collecting ideas",thesis:"Define the episode thesis together in the brain below.",needs:["Identify the main figures.","Choose the central Christological formula.","Show the direct connection to grace.","Clarify the relationship with Fulgentius and Rome."],segments:[]},
  {id:"ep-3",number:3,title:"Council of Orange — What It Said and Why",shortTitle:"Council of Orange",description:"The canons, context, institutional reception, and the difference between the council itself and later summaries.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Build the historical context.","Select the most important canons.","Distinguish Orange from simplistic internet readings."],segments:[]},
  {id:"ep-4",number:4,title:"From Augustine to Fulgentius",shortTitle:"Augustine to Fulgentius",description:"Continuity, development, and the North African institutional tradition of grace.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Map direct textual dependence.","Identify developments, not just repetitions.","Keep the institutional church in view."],segments:[]},
  {id:"ep-5",number:5,title:"Grace, Perseverance, and the Medieval Line",shortTitle:"The Medieval Line",description:"How these arguments continue beyond late antiquity, including the path toward Gottschalk.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Choose a manageable medieval bridge.","Avoid a straight-line genealogy.","Collect direct witnesses."],segments:[]},
  {id:"ep-6",number:6,title:"Reformed Retrieval — Continuity Without Anachronism",shortTitle:"Reformed Retrieval",description:"What Reformed Christians can responsibly receive from the patristic debates and where historical differences remain.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Name real continuities.","Name important differences.","End the series with a usable theological synthesis."],segments:[]}
];

const seedCards = [
  {id:"c1",episodeId:"ep-1",kind:"idea",title:"Let the opening quotation breathe",body:"Put the quotation on screen with no attribution and pause before asking whether it sounds like Calvin, Westminster, or Dort.",name:"TRC",created:"Seed idea"},
  {id:"c2",episodeId:"ep-1",kind:"idea",title:"Use the exile map early",body:"Show North Africa to Sardinia while explaining that Fulgentius became a spokesman for the exiled African bishops.",name:"Esther",created:"Seed idea"},
  {id:"c3",episodeId:"ep-1",kind:"note",title:"Verify the conversion timeline",body:"We need the exact textual and scholarly support for the move from a broader saving will to the later restricted position.",name:"Esther",created:"Research note"},
  {id:"c4",episodeId:"ep-1",kind:"note",title:"Do not overstate the Reformed bridge",body:"Say that these are Fulgentius’s own conclusions in his own setting. Avoid displaced-Calvinist language.",name:"Titus",created:"Editorial note"},
  {id:"c5",episodeId:"ep-1",kind:"source",title:"Faith is a gift of grace",body:"“For man to believe is the work of grace alone, because faith itself is found among the gifts of grace.” — Letter 17 [2240], §47",name:"Sword",created:"Primary text"},
  {id:"c6",episodeId:"ep-1",kind:"source",title:"Grace precedes, accompanies, and follows",body:"Letter to Senator Theodore [2235], §6, 12. Use for the main three-part structure of grace beginning, sustaining, and completing.",name:"Sword",created:"Primary text"},
  {id:"c7",episodeId:"ep-2",kind:"idea",title:"Begin with the strange formula",body:"Open with “one of the Trinity suffered” and ask why monks debating Christology were also writing about grace.",name:"TRC",created:"Seed idea"},
  {id:"c8",episodeId:"ep-1",kind:"idea",title:"Make the institutional witness visible",body:"Do not present Fulgentius as a solitary theologian. Put “Fulgentius + fourteen co-signing bishops” on screen and explain why the corporate witness matters.",name:"Sword",created:"Episode thesis"},
  {id:"c9",episodeId:"ep-1",kind:"idea",title:"Build the episode around four gifts",body:"Use a recurring visual sequence: faith → beginning of good will → perseverance → final glorification. Return to it at the synthesis.",name:"Titus",created:"Structure idea"},
  {id:"c10",episodeId:"ep-1",kind:"note",title:"Perseverance is not an appendix",body:"Final perseverance and glorification belong inside the same gracious purpose that grants faith. Do not treat them as later add-ons.",name:"Titus",created:"Argument note"},
  {id:"c11",episodeId:"ep-1",kind:"note",title:"Preserve moral asymmetry",body:"Predestination to grace is mercy; condemnation is just judgment on the creature’s own corrupt desire. God is not the author of evil.",name:"Sword",created:"Guardrail"},
  {id:"c12",episodeId:"ep-1",kind:"note",title:"Handle Proverbs 8:35 modestly",body:"Report how Fulgentius and his circle received and used the text. Do not turn this episode into a lexical defense of the rendering.",name:"Esther",created:"Editorial guardrail"},
  {id:"c13",episodeId:"ep-1",kind:"note",title:"The lay-listener question",body:"Can the controversy be explained through one question: Why did you believe when another did not—and will the answer remain grace all the way to glory?",name:"TRC",created:"Audience note"},
  {id:"c14",episodeId:"ep-1",kind:"source",title:"The soul does not give itself faith",body:"Letter 17 [2240], §47: use the body/soul analogy to explain why faith vivifies the soul but is not self-generated by it.",name:"Esther",created:"Primary text"},
  {id:"c15",episodeId:"ep-1",kind:"source",title:"The unchangeable order of divine work",body:"Letter 17 [2240], §67: illumination, perseverance, and glorification follow the order established by God’s unchangeable will.",name:"Sword",created:"Primary text"},
  {id:"c16",episodeId:"ep-1",kind:"source",title:"God does not work evil in the wicked",body:"To Monimus I.7.1 and I.XIII.2: pair both quotations so the asymmetry is stated in Fulgentius’s own words.",name:"Esther",created:"Primary text"},
  {id:"c17",episodeId:"ep-1",kind:"source",title:"Maxwell on Christology and grace",body:"Use modern scholarship to connect Fulgentius’s Christological commitments with antecedent grace, while allowing the primary texts to carry the historical claim.",name:"Esther",created:"Secondary source"},
  {id:"c18",episodeId:"ep-2",kind:"source",title:"Collect the Scythian dossier",body:"Create a source table with author, addressee, date, Christological formula, grace claim, and relationship to the African bishops.",name:"Esther",created:"Research task"},
  {id:"c19",episodeId:"ep-3",kind:"note",title:"Orange: reception, not a magical endpoint",body:"Frame the council as ecclesial reception of a live controversy. Ask which questions it settled and which it deliberately left open.",name:"TRC",created:"Framing note"},
  {id:"c20",episodeId:"ep-4",kind:"idea",title:"Show development without a straight line",body:"Compare Augustine and Fulgentius using shared grammar, new pressures, institutional context, and points of development rather than treating one as a photocopy of the other.",name:"Titus",created:"Episode angle"},
  {id:"c21",episodeId:"ep-5",kind:"source",title:"Follow the line to Gottschalk",body:"Collect the passages where Gottschalk names or uses Fulgentius, then distinguish direct dependence from broader Augustinian inheritance.",name:"Sword",created:"Research lead"},
  {id:"c22",episodeId:"ep-6",kind:"note",title:"No simplistic patristic-to-Reformed genealogy",body:"The final bridge should retrieve shared theological grammar while naming real differences in context, vocabulary, ecclesiology, and confessional development.",name:"Titus",created:"Series guardrail"},
  {id:"c23",episodeId:"ep-6",kind:"idea",title:"End with a responsible retrieval checklist",body:"Give listeners four questions for using the Fathers well: What did the source say? In what controversy? With what institutional weight? What can and cannot be carried forward?",name:"TRC",created:"Finale idea"}
];

const storedEpisodes = JSON.parse(localStorage.getItem("ctEpisodes") || "null");
const storedCards = JSON.parse(localStorage.getItem("ctCards") || "null");
let episodes = storedEpisodes || initialEpisodes;
const contentVersion = 2;
const storedContentVersion = Number(localStorage.getItem("ctContentVersion") || 0);
let cards = storedCards || seedCards;
if (storedCards && storedContentVersion < contentVersion) {
  cards = [...storedCards, ...seedCards.filter(seed=>!storedCards.some(card=>card.id===seed.id))];
  localStorage.setItem("ctCards", JSON.stringify(cards));
}
localStorage.setItem("ctContentVersion", String(contentVersion));
let activeEpisodeId = localStorage.getItem("ctActiveEpisode") || episodes[0].id;
let activeTab = "brain";
let editingCardId = null;

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const activeEpisode = () => episodes.find(ep => ep.id === activeEpisodeId) || episodes[0];
const clean = value => value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function renderEpisodes(){
  $("#episodeList").innerHTML = episodes.sort((a,b)=>a.number-b.number).map(ep=>`<button class="episode-button ${ep.id===activeEpisodeId?"active":""}" data-episode="${ep.id}"><span class="episode-number">${String(ep.number).padStart(2,"0")}</span><span><strong>${clean(ep.shortTitle||ep.title)}</strong><small>${clean(ep.status)}</small></span></button>`).join("");
  $$(".episode-button").forEach(button=>button.addEventListener("click",()=>{activeEpisodeId=button.dataset.episode;localStorage.setItem("ctActiveEpisode",activeEpisodeId);activeTab="brain";renderAll();}));
}

function renderHeader(){
  const ep=activeEpisode();
  $("#episodeHeader").innerHTML=`<div><span class="kicker">Episode ${ep.number}</span><h2>${clean(ep.title)}</h2><p>${clean(ep.description)}</p></div><div class="episode-header-actions"><span class="episode-status">${clean(ep.status)}</span><button class="edit-episode-button" id="editEpisodeButton">Edit episode</button></div>`;
  $("#modalEpisodeLabel").textContent=`Episode ${ep.number}`;
  $("#editEpisodeButton").addEventListener("click",openEpisodeEditor);
}

function renderCards(){
  const episodeCards=cards.filter(card=>card.episodeId===activeEpisodeId);
  const groups={idea:episodeCards.filter(c=>c.kind==="idea"),note:episodeCards.filter(c=>c.kind==="note"),source:episodeCards.filter(c=>c.kind==="source")};
  renderCardGroup("ideasList",groups.idea,"ideasCount");renderCardGroup("notesList",groups.note,"notesCount");renderCardGroup("sourcesList",groups.source,"sourcesCount");
}

function renderCardGroup(listId,items,countId){
  $("#"+countId).textContent=items.length;
  $("#"+listId).innerHTML=items.length?items.map(card=>`<article class="brain-card"><div class="card-actions"><button data-edit-card="${card.id}" title="Edit">✎</button><button data-delete="${card.id}" title="Delete">×</button></div><h4>${clean(card.title)}</h4><p>${clean(card.body)}</p><footer><strong>${clean(card.name)}</strong><span>${clean(card.created)}</span></footer></article>`).join(""):`<div class="empty-cards">Nothing here yet.<br>Add the first item for this episode.</div>`;
  $$(`[data-delete]`,$("#"+listId)).forEach(button=>button.addEventListener("click",()=>{cards=cards.filter(card=>card.id!==button.dataset.delete);saveCards();renderCards();}));
  $$(`[data-edit-card]`,$("#"+listId)).forEach(button=>button.addEventListener("click",()=>openCardEditor(button.dataset.editCard)));
}

function renderPlan(){
  const ep=activeEpisode();
  $("#segmentList").innerHTML=ep.segments.length?ep.segments.map((segment,index)=>`<div class="segment"><span class="segment-index">${index+1}</span><span><strong>${clean(segment[0])}</strong><small>${clean(segment[1])}</small></span><time>${clean(segment[2])}</time></div>`).join(""):`<div class="empty-cards">No running order yet. Add ideas in the episode brain, then shape the plan together.</div>`;
}

function renderAbout(){
  const ep=activeEpisode();$("#episodeThesis").textContent=ep.thesis;$("#episodeNeeds").innerHTML=ep.needs.map(need=>`<li>${clean(need)}</li>`).join("");
}

function renderTabs(){
  $$(".episode-tabs button").forEach(button=>button.classList.toggle("active",button.dataset.tab===activeTab));
  $$(".tab-panel").forEach(panel=>panel.classList.remove("active"));$("#"+activeTab+"Panel").classList.add("active");
}

function renderAll(){renderEpisodes();renderHeader();renderCards();renderPlan();renderAbout();renderTabs()}
function persistWorkspace(){localStorage.setItem("ctCards",JSON.stringify(cards));localStorage.setItem("ctEpisodes",JSON.stringify(episodes));saveWorkspace({episodes,cards}).catch(error=>console.error("Remote save failed",error))}
function saveCards(){persistWorkspace()}
function saveEpisodes(){persistWorkspace()}
function openModal(id,kind){const modal=$("#"+id);modal.classList.add("open");modal.setAttribute("aria-hidden","false");if(kind){const radio=$(`input[name='kind'][value='${kind}']`);if(radio)radio.checked=true;}if(id==="contributionModal"&&!editingCardId){const saved=localStorage.getItem("ctPerson")||"";$("#contributionName").value=saved;$("#contributionTitle").textContent="Add to the episode brain";$("#contributionForm button[type='submit']").textContent="Add it";setTimeout(()=>$("#contributionTitleInput").focus(),100)}}
function closeModal(id){const modal=$("#"+id);modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2400)}
function updatePerson(){const name=$("#personName").value.trim();if(!name)return;localStorage.setItem("ctPerson",name);$("#contributionName").value=name;$("#currentPersonMessage").textContent=`You are adding as ${name}.`;$("#currentPersonMessage").classList.add("named");showToast(`Name saved: ${name}`)}
function openCardEditor(id){const card=cards.find(item=>item.id===id);if(!card)return;editingCardId=id;$("#contributionTitle").textContent="Edit this contribution";$("#contributionTitleInput").value=card.title;$("#contributionBody").value=card.body;$("#contributionName").value=card.name;const radio=$(`input[name='kind'][value='${card.kind}']`);if(radio)radio.checked=true;$("#contributionForm button[type='submit']").textContent="Save changes";const modal=$("#contributionModal");modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function openEpisodeEditor(){const ep=activeEpisode();$("#editEpisodeName").value=ep.title;$("#editEpisodeShortName").value=ep.shortTitle||ep.title;$("#editEpisodeDescription").value=ep.description;$("#editEpisodeStatus").value=ep.status;$("#editEpisodeThesis").value=ep.thesis;$("#editEpisodeNeeds").value=ep.needs.join("\n");$("#editEpisodeSegments").value=ep.segments.map(segment=>segment.join(" | ")).join("\n");openModal("editEpisodeModal")}

document.addEventListener("DOMContentLoaded",()=>{
  const savedName=localStorage.getItem("ctPerson")||"";$("#personName").value=savedName;if(savedName){$("#currentPersonMessage").textContent=`You are adding as ${savedName}.`;$("#currentPersonMessage").classList.add("named")}
  renderAll();
  startSync({episodes,cards},data=>{episodes=data.episodes;cards=data.cards;localStorage.setItem("ctEpisodes",JSON.stringify(episodes));localStorage.setItem("ctCards",JSON.stringify(cards));renderAll()},(state,message)=>{const status=$("#syncStatus");status.className=`sync-status ${state}`;status.innerHTML=`<i></i> ${clean(message)}`});
  $("#saveName").addEventListener("click",updatePerson);$("#personName").addEventListener("keydown",event=>{if(event.key==="Enter")updatePerson()});
  $$(".episode-tabs button").forEach(button=>button.addEventListener("click",()=>{activeTab=button.dataset.tab;renderTabs()}));
  $("#openContributionForm").addEventListener("click",()=>{editingCardId=null;$("#contributionForm").reset();openModal("contributionModal")});$$(".add-inline").forEach(button=>button.addEventListener("click",()=>{editingCardId=null;$("#contributionForm").reset();openModal("contributionModal",button.dataset.kind)}));
  $("#openEpisodeForm").addEventListener("click",()=>openModal("episodeModal"));
  $$('[data-close]').forEach(button=>button.addEventListener("click",()=>closeModal(button.dataset.close)));$$('.modal').forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)closeModal(modal.id)}));
  $("#contributionForm").addEventListener("submit",event=>{event.preventDefault();const name=$("#contributionName").value.trim();const values={kind:$("input[name='kind']:checked").value,title:$("#contributionTitleInput").value.trim(),body:$("#contributionBody").value.trim(),name};if(editingCardId){const card=cards.find(item=>item.id===editingCardId);Object.assign(card,values);showToast("Contribution updated.")}else{cards.unshift({id:`card-${Date.now()}`,episodeId:activeEpisodeId,...values,created:new Date().toLocaleDateString(undefined,{month:"short",day:"numeric"})});showToast("Added to this episode.")}saveCards();localStorage.setItem("ctPerson",name);$("#personName").value=name;$("#currentPersonMessage").textContent=`You are adding as ${name}.`;$("#currentPersonMessage").classList.add("named");editingCardId=null;event.target.reset();closeModal("contributionModal");renderCards()});
  $("#episodeForm").addEventListener("submit",event=>{event.preventDefault();const number=Math.max(...episodes.map(ep=>ep.number),0)+1;const title=$("#newEpisodeTitle").value.trim();const description=$("#newEpisodeDescription").value.trim()||"Add the episode direction and build it together.";const ep={id:`ep-${Date.now()}`,number,title,shortTitle:title,description,status:"New episode",thesis:"Define the episode thesis together in the brain below.",needs:["Add content ideas.","Collect notes and questions.","Find primary sources and quotations."],segments:[]};episodes.push(ep);saveEpisodes();activeEpisodeId=ep.id;event.target.reset();closeModal("episodeModal");renderAll();showToast(`Episode ${number} added.`)});
  $("#editEpisodeForm").addEventListener("submit",event=>{event.preventDefault();const ep=activeEpisode();ep.title=$("#editEpisodeName").value.trim();ep.shortTitle=$("#editEpisodeShortName").value.trim();ep.description=$("#editEpisodeDescription").value.trim();ep.status=$("#editEpisodeStatus").value.trim()||"In progress";ep.thesis=$("#editEpisodeThesis").value.trim();ep.needs=$("#editEpisodeNeeds").value.split("\n").map(item=>item.trim()).filter(Boolean);ep.segments=$("#editEpisodeSegments").value.split("\n").map(line=>line.split("|").map(part=>part.trim())).filter(parts=>parts[0]).map(parts=>[parts[0],parts[1]||"",parts[2]||""]);saveEpisodes();closeModal("editEpisodeModal");renderAll();showToast("Episode updated.")});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"){$$(".modal.open").forEach(modal=>closeModal(modal.id))}});
});
