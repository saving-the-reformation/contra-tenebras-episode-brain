import { startSync, saveWorkspace } from "./sync.js";

const initialEpisodes = [
  {
    id: "ep-1",
    number: 1,
    title: "Fulgentius of Ruspe and the Priority of Grace",
    shortTitle: "Fulgentius and Grace",
    description: "Faith, the beginning of good will, perseverance, and final glorification as gifts grounded in God’s antecedent grace and eternal purpose.",
    status: "IN PROGRESS: SLIDES & SCRIPT",
    thesis: "Fulgentius presents faith, the beginning of the good will, perseverance, and final glorification as gifts grounded in God’s antecedent grace and eternal purpose.",
    needs: ["Keep the episode between 10 and 12 minutes.", "Make a positive historical case before drawing confessional comparisons.", "Distinguish direct evidence from interpretation and verify every quotation.", "Use four principal texts rather than overloading the episode.", "Do not call Fulgentius a sixteenth-century Calvinist displaced in time.", "Handle contested translations and Proverbs 8:35 with precision."],
    segments: [
      ["Hook", "A quotation that sounds post-Reformation, followed by the reveal: Fulgentius and fellow African bishops in exile.", "0:00–0:45"],
      ["Context", "Identify Fulgentius, his North African setting, the dispute over the first movement of faith, and his ecclesial standing.", "0:45–2:00"],
      ["Grace Begins", "Explain prevenient, concomitant, and subsequent grace using the Letter to Senator Theodore.", "2:00–4:00"],
      ["Grace Vivifies", "Use the soul–body analogy: faith and every good willing depend upon vivifying grace.", "4:00–6:30"],
      ["Grace Completes", "Connect illumination, perseverance, and glorification to predestination and God’s unchangeable purpose.", "6:30–9:00"],
      ["Guardrail", "Show Fulgentius’ asymmetry: God grants righteousness; He is not the author of depravity.", "9:00–10:30"],
      ["Synthesis", "State the precise historical conclusion and preview the Scythian monks.", "10:30–11:30"]
    ]
  },
  {id:"ep-2",number:2,title:"The Scythian Monks — Christology and the Grace Connection",shortTitle:"The Scythian Monks",description:"The men whose questions produced the letters: their Christology, doctrine of grace, and why they believed the two belonged together.",status:"Collecting ideas",thesis:"Define the episode thesis together in the brain below.",needs:["Identify the main figures.","Choose the central Christological formula.","Show the direct connection to grace.","Clarify the relationship with Fulgentius and Rome."],segments:[]},
  {id:"ep-3",number:3,title:"Council of Orange — What It Said and Why",shortTitle:"Council of Orange",description:"The canons, context, institutional reception, and the difference between the council itself and later summaries.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Build the historical context.","Select the most important canons.","Distinguish Orange from simplistic internet readings."],segments:[]},
  {id:"ep-4",number:4,title:"From Augustine to Fulgentius",shortTitle:"Augustine to Fulgentius",description:"Continuity, development, and the North African institutional tradition of grace.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Map direct textual dependence.","Identify developments, not just repetitions.","Keep the institutional church in view."],segments:[]},
  {id:"ep-5",number:5,title:"Grace, Perseverance, and the Medieval Line",shortTitle:"The Medieval Line",description:"How these arguments continue beyond late antiquity, including the path toward Gottschalk.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Choose a manageable medieval bridge.","Avoid a straight-line genealogy.","Collect direct witnesses."],segments:[]},
  {id:"ep-6",number:6,title:"Reformed Retrieval — Continuity Without Anachronism",shortTitle:"Reformed Retrieval",description:"What Reformed Christians can responsibly receive from the patristic debates and where historical differences remain.",status:"Future episode",thesis:"Define the episode thesis together in the brain below.",needs:["Name real continuities.","Name important differences.","End the series with a usable theological synthesis."],segments:[]}
];

const seedCards = [
  {id:"c1",episodeId:"ep-1",kind:"idea",title:"Opening hook: recognition before reveal",body:"Open with a quotation that sounds post-Reformation, then reveal that it came from Fulgentius and fellow African bishops in exile. Include one restrained “Who said it?” interruption.",name:"Episode 1 Production Notes",created:"Meeting notes"},
  {id:"c2",episodeId:"ep-1",kind:"idea",title:"Use restrained historical visuals",body:"Use dates, locations, and relationships as restrained visual anchors. Put exact quotations and sources on screen and highlight only the clause being narrated.",name:"Episode 1 Production Notes",created:"Visual direction"},
  {id:"c3",episodeId:"ep-1",kind:"idea",title:"Use a second narrator strategically",body:"Use a second narrator for one quotation or transition to reset attention without changing the sober tone.",name:"Episode 1 Production Notes",created:"Production direction"},
  {id:"c4",episodeId:"ep-1",kind:"note",title:"Make the positive historical case first",body:"Establish Fulgentius as a serious sixth-century witness before drawing confessional comparisons. Do not imply that a finished later Reformed system existed in the sixth century.",name:"Episode 1 Production Notes",created:"Editorial position"},
  {id:"c5",episodeId:"ep-1",kind:"note",title:"Limit the final cut to four principal texts",body:"Do not overload the episode with every available quotation. Four principal texts are enough for the 10–12 minute target.",name:"Episode 1 Production Notes",created:"Editorial limit"},
  {id:"c6",episodeId:"ep-1",kind:"note",title:"Preserve the moral asymmetry",body:"Fulgentius denies that predestination coerces the wicked or makes God the author of evil. God grants righteousness; depravity arises through withdrawal from God.",name:"Episode 1 Production Notes",created:"Doctrinal guardrail"},
  {id:"c7",episodeId:"ep-1",kind:"note",title:"Handle Proverbs 8:35 with precision",body:"Report how Fulgentius, Augustine, and the Scythian monks received and used “the will is prepared by the Lord.” Do not present a complete lexical defense without independent checking.",name:"Episode 1 Production Notes",created:"Verification note"},
  {id:"c8",episodeId:"ep-1",kind:"note",title:"Pre-publication verification list",body:"Verify every quotation against the cited English edition; standardize Fulgentius/Fulgence; confirm To Monimus dates and divisions; check Pope Symmachus details; verify Proverbs 8:35 provenance; add a consistent final bibliography.",name:"Episode 1 Production Notes",created:"Verification list"},
  {id:"c9",episodeId:"ep-1",kind:"source",title:"Threefold grace",body:"Letter to Senator Theodore 2235 [6, 12] — use to define prevenient, concomitant, and subsequent grace: beginning, continuation, and consummation.",name:"Episode 1 Production Notes",created:"Primary text"},
  {id:"c10",episodeId:"ep-1",kind:"source",title:"Faith and good willing as vivifying grace",body:"Letter of Fulgence and Fourteen Other African Bishops Exiled in Sardinia 2240 [17, 47] — principal proof text for faith as gift, grace alone, and the renewed will’s continuing dependence.",name:"Episode 1 Production Notes",created:"Primary text"},
  {id:"c11",episodeId:"ep-1",kind:"source",title:"Perseverance and glorification",body:"Letter 2240 [17, 67] — illumination, perseverance, and glorification grounded in predestination and God’s unchangeable purpose.",name:"Episode 1 Production Notes",created:"Primary text"},
  {id:"c12",episodeId:"ep-1",kind:"source",title:"Predestination, mercy, and judgment",body:"To Monimus [1, 7, 1] — use for predestination, gratuitous mercy, due judgment, and the denial that God authors evil.",name:"Episode 1 Production Notes",created:"Primary text"},
  {id:"c13",episodeId:"ep-1",kind:"source",title:"Reserve text on divine authorship",body:"To Monimus [1, 25, 4] clarifies the asymmetry between the gift of righteousness and judgment of sin. Reserve it unless the final cut has enough time.",name:"Episode 1 Production Notes",created:"Reserve source"},
  {id:"c14",episodeId:"ep-2",kind:"idea",title:"Next episode bridge: the Scythian monks",body:"Turn next to the Scythian monks, their reading of “the will is prepared by the Lord,” and the relationship between their Christology and soteriology.",name:"Episode 1 Production Notes",created:"Documented bridge"},
  {id:"c15",episodeId:"ep-1",kind:"note",title:"NEED: start working on the thumbnail",body:"Needs ideas and vibes for the thumbnail.",name:"Esther",created:"Jul 14"},
  {id:"c16",episodeId:"ep-1",kind:"note",title:"NEED: finish the slides & script 7/14/26",body:"Work together with Sword to finalize the slides today and the script.",name:"Esther",created:"Jul 14"}
];

const storedEpisodes = JSON.parse(localStorage.getItem("ctEpisodes") || "null");
const storedCards = JSON.parse(localStorage.getItem("ctCards") || "null");
const storedFiles = JSON.parse(localStorage.getItem("ctFiles") || "null");
let episodes = storedEpisodes || initialEpisodes;
let files = storedFiles || [];
const contentVersion = 3;
const storedContentVersion = Number(localStorage.getItem("ctContentVersion") || 0);
let cards = storedCards || seedCards;
if (storedCards && storedContentVersion < contentVersion) {
  const userCards = storedCards.filter(card=>!/^c\d+$/.test(card.id));
  cards = [...userCards, ...seedCards.filter(seed=>!userCards.some(card=>card.episodeId===seed.episodeId&&card.title.trim().toLowerCase()===seed.title.trim().toLowerCase()))];
  localStorage.setItem("ctCards", JSON.stringify(cards));
  const episodeOne = episodes.find(episode=>episode.id==="ep-1");
  if (episodeOne) {
    episodeOne.description = initialEpisodes[0].description;
    episodeOne.thesis = initialEpisodes[0].thesis;
    episodeOne.needs = initialEpisodes[0].needs;
    episodeOne.segments = initialEpisodes[0].segments;
    localStorage.setItem("ctEpisodes", JSON.stringify(episodes));
  }
}
localStorage.setItem("ctContentVersion", String(contentVersion));
let activeEpisodeId = localStorage.getItem("ctActiveEpisode") || episodes[0].id;
let activeTab = "brain";
let editingCardId = null;
let editingMaterialId = null;

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
  $("#episodeHeader").innerHTML=`<div><span class="kicker">Episode ${ep.number}</span><h2>${clean(ep.title)}</h2><p>${clean(ep.description)}</p></div><div class="episode-header-actions"><button class="episode-status" id="editStatusButton" title="Click to change status">${clean(ep.status)} <span>✎</span></button><button class="edit-episode-button" id="editEpisodeButton">Edit episode</button></div>`;
  $("#modalEpisodeLabel").textContent=`Episode ${ep.number}`;
  $("#editEpisodeButton").addEventListener("click",openEpisodeEditor);
  $("#editStatusButton").addEventListener("click",openEpisodeEditor);
}

function renderCards(){
  const episodeCards=cards.filter(card=>card.episodeId===activeEpisodeId);
  const newestFirst=(a,b)=>cardAddedOrder(b)-cardAddedOrder(a);
  const groups={idea:episodeCards.filter(c=>c.kind==="idea").sort(newestFirst),note:episodeCards.filter(c=>c.kind==="note").sort(newestFirst),source:episodeCards.filter(c=>c.kind==="source").sort(newestFirst)};
  renderCardGroup("ideasList",groups.idea,"ideasCount");renderCardGroup("notesList",groups.note,"notesCount");renderCardGroup("sourcesList",groups.source,"sourcesCount");
}

function cardAddedOrder(card){
  const savedTime=Date.parse(card.addedAt||"");
  if(Number.isFinite(savedTime))return savedTime;
  const timestampId=String(card.id||"").match(/^card-(\d+)/);
  if(timestampId)return Number(timestampId[1]);
  const seededId=String(card.id||"").match(/^c(\d+)$/);
  return seededId?Number(seededId[1]):0;
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

const productionPhases=["Research & script","Visuals & assets","Recording & edit","Release & promotion"];
const defaultProductionTasks=[
  ["research-thesis","Research & script","Lock the episode thesis and central argument"],
  ["research-script","Research & script","Complete the full script or speaking outline"],
  ["research-quotes","Research & script","Verify every primary-source quotation"],
  ["research-citations","Research & script","Complete citations, bibliography, and source links"],
  ["research-review","Research & script","Finish theological and historical accuracy review"],
  ["visual-slides","Visuals & assets","Finish slides, quotations, maps, and visual inserts"],
  ["visual-rights","Visuals & assets","Confirm image permissions and attribution"],
  ["visual-thumbnail","Visuals & assets","Approve the final thumbnail"],
  ["visual-brand","Visuals & assets","Check logo, fonts, colors, and visual consistency"],
  ["production-record","Recording & edit","Record the final narration and host segments"],
  ["production-audio","Recording & edit","Clean audio and balance music levels"],
  ["production-video","Recording & edit","Complete the final video edit"],
  ["production-captions","Recording & edit","Review captions, names, Latin, and technical terms"],
  ["production-watch","Recording & edit","Complete a full-team final watch-through"],
  ["release-title","Release & promotion","Approve the public title and description"],
  ["release-details","Release & promotion","Add chapters, links, credits, and bibliography"],
  ["release-youtube","Release & promotion","Add end screen, cards, playlist, and thumbnail"],
  ["release-upload","Release & promotion","Upload, process, and schedule the final video"],
  ["release-promo","Release & promotion","Prepare announcement and social posts"],
  ["release-live","Release & promotion","Publish the episode and verify the live page"]
].map(([id,phase,title])=>({id:`task-${id}`,phase,title,done:false,assignee:"",due:"",custom:false}));

function ensureProductionTasks(ep){
  const existing=Array.isArray(ep.productionTasks)?ep.productionTasks:[];
  const existingIds=new Set(existing.map(task=>task.id));
  ep.productionTasks=[...existing,...defaultProductionTasks.filter(task=>!existingIds.has(task.id)).map(task=>({...task}))];
  return ep.productionTasks;
}

function renderProduction(){
  const ep=activeEpisode();
  const tasks=ensureProductionTasks(ep);
  const completed=tasks.filter(task=>task.done).length;
  const percent=tasks.length?Math.round(completed/tasks.length*100):0;
  const message=percent===100?"Ready to publish. Bring it into the light.":percent>=80?"Final push — the finish line is in sight.":percent>=50?"More than halfway. Keep cooking.":percent>=25?"Momentum is building. Keep the team moving.":"Every checked box moves the episode toward launch.";
  $("#productionPercent").textContent=`${percent}%`;
  $("#productionMessage").textContent=message;
  $("#productionCompleted").textContent=`${completed} of ${tasks.length} launch tasks complete`;
  $("#productionBar").style.width=`${percent}%`;
  $("#productionProgress").setAttribute("aria-valuenow",String(percent));
  const seal=$("#launchSeal");
  seal.classList.toggle("ready",percent===100);
  seal.innerHTML=percent===100?"<span>✓</span><strong>READY</strong><small>publish the episode</small>":`<span>✦</span><strong>${percent>=50?"COOKING":"BUILDING"}</strong><small>toward launch</small>`;

  $("#productionTasks").innerHTML=productionPhases.map((phase,index)=>{
    const phaseTasks=tasks.filter(task=>task.phase===phase);
    const phaseDone=phaseTasks.filter(task=>task.done).length;
    const rows=phaseTasks.map(task=>{
      const overdue=task.due&&!task.done&&new Date(`${task.due}T23:59:59`)<new Date();
      return `<div class="production-task ${task.done?"complete":""} ${overdue?"overdue":""}">
        <label class="task-check"><input type="checkbox" data-task-check="${task.id}" ${task.done?"checked":""}><span>✓</span></label>
        <div class="task-main"><strong>${clean(task.title)}</strong><small>${task.done?`Completed${task.completedBy?` by ${clean(task.completedBy)}`:""}`:overdue?"Deadline passed — needs attention":"Ready to assign and complete"}</small></div>
        <label class="task-owner"><span>Owner</span><input data-task-owner="${task.id}" list="teamNames" value="${clean(task.assignee||"")}" placeholder="Unassigned"></label>
        <label class="task-date"><span>Due</span><input data-task-due="${task.id}" type="date" value="${clean(task.due||"")}"></label>
        ${task.custom?`<button class="task-delete" data-task-delete="${task.id}" title="Delete custom task">×</button>`:""}
      </div>`;
    }).join("");
    return `<section class="production-phase phase-${index+1}"><header><div><span>0${index+1}</span><div><h3>${phase}</h3><p>${phaseDone} of ${phaseTasks.length} complete</p></div></div><strong>${phaseTasks.length?Math.round(phaseDone/phaseTasks.length*100):0}%</strong></header><div class="phase-meter"><span style="width:${phaseTasks.length?phaseDone/phaseTasks.length*100:0}%"></span></div><div class="production-task-list">${rows}</div></section>`;
  }).join("");

  const names=new Set([localStorage.getItem("ctPerson"),...cards.map(card=>card.name),...tasks.map(task=>task.assignee)].filter(Boolean));
  $("#teamNames").innerHTML=[...names].sort().map(name=>`<option value="${clean(name)}"></option>`).join("");

  $$('[data-task-check]').forEach(input=>input.addEventListener("change",()=>{const task=tasks.find(item=>item.id===input.dataset.taskCheck);task.done=input.checked;task.completedAt=input.checked?new Date().toISOString():"";task.completedBy=input.checked?(localStorage.getItem("ctPerson")||task.assignee||"Team"):"";persistWorkspace();renderProduction();showToast(input.checked?"Task complete — progress updated.":"Task reopened.")}));
  $$('[data-task-owner]').forEach(input=>input.addEventListener("change",()=>{const task=tasks.find(item=>item.id===input.dataset.taskOwner);task.assignee=input.value.trim();persistWorkspace();renderProduction();showToast(task.assignee?`Assigned to ${task.assignee}.`:"Task unassigned.")}));
  $$('[data-task-due]').forEach(input=>input.addEventListener("change",()=>{const task=tasks.find(item=>item.id===input.dataset.taskDue);task.due=input.value;persistWorkspace();renderProduction();showToast(task.due?"Deadline saved.":"Deadline removed.")}));
  $$('[data-task-delete]').forEach(button=>button.addEventListener("click",()=>{const task=tasks.find(item=>item.id===button.dataset.taskDelete);if(!task||!confirm(`Delete the task “${task.title}”?`))return;ep.productionTasks=tasks.filter(item=>item.id!==task.id);persistWorkspace();renderProduction();showToast("Custom task deleted.")}));
}

const materialCategories=["Scripts & outlines","Slides & graphics","Research & sources","Audio & video","Other links"];
function normalizeUrl(value){const trimmed=value.trim();return /^https?:\/\//i.test(trimmed)?trimmed:`https://${trimmed}`}
function renderFiles(){const episodeLinks=files.filter(item=>item.episodeId===activeEpisodeId);$("#episodeFiles").innerHTML=materialCategories.map((category,index)=>{const categoryLinks=episodeLinks.filter(item=>(item.category||"Other links")===category).sort((a,b)=>new Date(b.addedAt||b.uploadedAt)-new Date(a.addedAt||a.uploadedAt));return `<section class="material-group"><header><span class="material-group-icon">${["S","P","R","A","+"][index]}</span><div><h3>${category}</h3><p>${["Working scripts, outlines, and drafts","Slide decks, thumbnails, and visual references","Articles, books, PDFs, and source collections","Recordings, music, clips, and video references","Anything that does not fit another section"][index]}</p></div><b>${categoryLinks.length}</b></header><div class="material-links">${categoryLinks.length?categoryLinks.map(link=>`<article class="material-link"><div><a href="${clean(link.url)}" target="_blank" rel="noopener">${clean(link.name)}</a><p>Added by ${clean(link.nameAddedBy||"Team")} · ${new Date(link.addedAt||link.uploadedAt).toLocaleDateString()}</p></div><div class="material-actions"><button data-edit-material="${link.id}">Edit</button><a href="${clean(link.url)}" target="_blank" rel="noopener">Open ↗</a><button data-delete-material="${link.id}">Delete</button></div></article>`).join(""):`<div class="material-empty">No links in this section yet.</div>`}</div></section>`}).join("");$$('[data-delete-material]').forEach(button=>button.addEventListener("click",()=>{const item=files.find(link=>link.id===button.dataset.deleteMaterial);if(!item||!confirm(`Delete the link “${item.name}”?`))return;files=files.filter(link=>link.id!==item.id);persistWorkspace();renderFiles();showToast("Link deleted.")}));$$('[data-edit-material]').forEach(button=>button.addEventListener("click",()=>{const item=files.find(link=>link.id===button.dataset.editMaterial);if(!item)return;editingMaterialId=item.id;$("#materialCategory").value=item.category||"Other links";$("#materialName").value=item.name;$("#materialUrl").value=item.url;$("#materialSubmitButton").textContent="Save link";$("#materialName").focus()}))}

function renderTabs(){
  $$(".episode-tabs button").forEach(button=>button.classList.toggle("active",button.dataset.tab===activeTab));
  $$(".tab-panel").forEach(panel=>panel.classList.remove("active"));$("#"+activeTab+"Panel").classList.add("active");
}

function renderAll(){renderEpisodes();renderHeader();renderCards();renderPlan();renderAbout();renderProduction();renderFiles();renderTabs()}
function persistWorkspace(){localStorage.setItem("ctCards",JSON.stringify(cards));localStorage.setItem("ctEpisodes",JSON.stringify(episodes));localStorage.setItem("ctFiles",JSON.stringify(files));saveWorkspace({episodes,cards,files}).catch(error=>console.error("Remote save failed",error))}
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
  startSync({episodes,cards,files},data=>{episodes=data.episodes;cards=data.cards;files=data.files||[];localStorage.setItem("ctEpisodes",JSON.stringify(episodes));localStorage.setItem("ctCards",JSON.stringify(cards));localStorage.setItem("ctFiles",JSON.stringify(files));renderAll()},(state,message)=>{const status=$("#syncStatus");status.className=`sync-status ${state}`;status.innerHTML=`<i></i> ${clean(message)}`});
  $("#saveName").addEventListener("click",updatePerson);$("#personName").addEventListener("keydown",event=>{if(event.key==="Enter")updatePerson()});
  $$(".episode-tabs button").forEach(button=>button.addEventListener("click",()=>{activeTab=button.dataset.tab;renderTabs()}));
  $("#openContributionForm").addEventListener("click",()=>{editingCardId=null;$("#contributionForm").reset();openModal("contributionModal")});$$(".add-inline").forEach(button=>button.addEventListener("click",()=>{editingCardId=null;$("#contributionForm").reset();openModal("contributionModal",button.dataset.kind)}));
  $("#openEpisodeForm").addEventListener("click",()=>openModal("episodeModal"));
  $("#taskAddForm").addEventListener("submit",event=>{event.preventDefault();const ep=activeEpisode();const tasks=ensureProductionTasks(ep);const title=$("#taskTitle").value.trim();tasks.push({id:`task-custom-${Date.now()}`,phase:$("#taskPhase").value,title,done:false,assignee:$("#taskAssignee").value.trim(),due:$("#taskDue").value,custom:true,addedAt:new Date().toISOString()});event.target.reset();persistWorkspace();renderProduction();showToast("Custom production task added.")});
  $("#materialLinkForm").addEventListener("submit",event=>{event.preventDefault();const person=localStorage.getItem("ctPerson")||$("#personName").value.trim();if(!person){showToast("Type and save your name before adding a link.");return}let url;try{url=new URL(normalizeUrl($("#materialUrl").value)).href}catch{showToast("Please enter a valid web link.");return}const values={episodeId:activeEpisodeId,category:$("#materialCategory").value,name:$("#materialName").value.trim(),url,nameAddedBy:person,addedAt:new Date().toISOString()};if(editingMaterialId){Object.assign(files.find(item=>item.id===editingMaterialId),values);showToast("Link updated.")}else{files.unshift({id:`link-${Date.now()}`,...values});showToast("Link added to this episode.")}editingMaterialId=null;event.target.reset();$("#materialSubmitButton").textContent="＋ Add link";persistWorkspace();renderFiles()});
  $$('[data-close]').forEach(button=>button.addEventListener("click",()=>closeModal(button.dataset.close)));$$('.modal').forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)closeModal(modal.id)}));
  $("#contributionForm").addEventListener("submit",event=>{event.preventDefault();const name=$("#contributionName").value.trim();const values={kind:$("input[name='kind']:checked").value,title:$("#contributionTitleInput").value.trim(),body:$("#contributionBody").value.trim(),name};if(editingCardId){const card=cards.find(item=>item.id===editingCardId);Object.assign(card,values);showToast("Contribution updated.")}else{cards.unshift({id:`card-${Date.now()}`,episodeId:activeEpisodeId,...values,created:new Date().toLocaleDateString(undefined,{month:"short",day:"numeric"}),addedAt:new Date().toISOString()});showToast("Added to this episode.")}saveCards();localStorage.setItem("ctPerson",name);$("#personName").value=name;$("#currentPersonMessage").textContent=`You are adding as ${name}.`;$("#currentPersonMessage").classList.add("named");editingCardId=null;event.target.reset();closeModal("contributionModal");renderCards()});
  $("#episodeForm").addEventListener("submit",event=>{event.preventDefault();const number=Math.max(...episodes.map(ep=>ep.number),0)+1;const title=$("#newEpisodeTitle").value.trim();const description=$("#newEpisodeDescription").value.trim()||"Add the episode direction and build it together.";const ep={id:`ep-${Date.now()}`,number,title,shortTitle:title,description,status:"New episode",thesis:"Define the episode thesis together in the brain below.",needs:["Add content ideas.","Collect notes and questions.","Find primary sources and quotations."],segments:[]};episodes.push(ep);saveEpisodes();activeEpisodeId=ep.id;event.target.reset();closeModal("episodeModal");renderAll();showToast(`Episode ${number} added.`)});
  $("#editEpisodeForm").addEventListener("submit",event=>{event.preventDefault();const ep=activeEpisode();ep.title=$("#editEpisodeName").value.trim();ep.shortTitle=$("#editEpisodeShortName").value.trim();ep.description=$("#editEpisodeDescription").value.trim();ep.status=$("#editEpisodeStatus").value.trim()||"In progress";ep.thesis=$("#editEpisodeThesis").value.trim();ep.needs=$("#editEpisodeNeeds").value.split("\n").map(item=>item.trim()).filter(Boolean);ep.segments=$("#editEpisodeSegments").value.split("\n").map(line=>line.split("|").map(part=>part.trim())).filter(parts=>parts[0]).map(parts=>[parts[0],parts[1]||"",parts[2]||""]);saveEpisodes();closeModal("editEpisodeModal");renderAll();showToast("Episode updated.")});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"){$$(".modal.open").forEach(modal=>closeModal(modal.id))}});
});
