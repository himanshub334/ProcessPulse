import {query} from '../db';
export async function syncJira(){
 const base=process.env.JIRA_BASE_URL,email=process.env.JIRA_EMAIL,token=process.env.JIRA_API_TOKEN,project=process.env.JIRA_PROJECT_KEY;
 if(!base||!email||!token||!project) return {mode:'demo',message:'Jira credentials not configured'};
 const auth=Buffer.from(`${email}:${token}`).toString('base64');
 const r=await fetch(`${base}/rest/api/3/search?jql=project=${project}&maxResults=100`,{headers:{Authorization:`Basic ${auth}`,Accept:'application/json'}});
 if(!r.ok) throw new Error(`Jira returned ${r.status}`);
 const data:any=await r.json();
 for(const i of data.issues||[]) await query(`INSERT INTO issues(id,title,type,status,story_points,owner) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(id) DO UPDATE SET title=EXCLUDED.title,status=EXCLUDED.status,story_points=EXCLUDED.story_points`,[i.key,i.fields.summary,i.fields.issuetype?.name,i.fields.status?.name,Number(i.fields.customfield_10016||0),i.fields.assignee?.displayName||null]);
 return {mode:'jira',synced:data.issues?.length||0};
}
