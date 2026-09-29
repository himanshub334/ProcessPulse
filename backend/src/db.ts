import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
export const pool=new Pool({connectionString:process.env.DATABASE_URL||'postgres://sprintsync:sprintsync@localhost:5432/sprintsync'});
export async function query<T=any>(text:string,params:any[]=[]){return pool.query<T>(text,params)}
export async function seed(){
 await query(`INSERT INTO teams(name) VALUES ('Platform'),('Payments'),('Growth') ON CONFLICT DO NOTHING`);
 await query(`INSERT INTO sprints(name,start_date,end_date,team_id,velocity) SELECT 'Sprint 24',CURRENT_DATE-INTERVAL '10 days',CURRENT_DATE+INTERVAL '4 days',1,42 WHERE NOT EXISTS(SELECT 1 FROM sprints)`);
 const issues=[['SYN-101','Dependency API','Story','In Progress',8,1,1,'Aisha'],['SYN-102','Billing webhook','Bug','To Do',5,2,1,'Ravi'],['SYN-103','Release dashboard','Story','Done',3,1,1,'Meera'],['SYN-104','SSO hardening','Epic','In Progress',13,3,1,'Kabir'],['SYN-105','Audit export','Story','Blocked',8,2,1,'Neha']];
 for(const x of issues) await query(`INSERT INTO issues(id,title,type,status,story_points,team_id,sprint_id,owner) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(id) DO NOTHING`,x);
 await query(`INSERT INTO dependencies(blocking_issue_id,blocked_issue_id) VALUES('SYN-101','SYN-105'),('SYN-104','SYN-102') ON CONFLICT DO NOTHING`);
 await query(`INSERT INTO milestones(name,target_date,issue_ids) VALUES('Q3 Release',CURRENT_DATE+INTERVAL '14 days',ARRAY['SYN-101','SYN-102','SYN-104','SYN-105']) ON CONFLICT DO NOTHING`);
 await query(`INSERT INTO communications(kind,note,decision,action_item,owner,due_date) VALUES('Steering meeting','Release scope reviewed','Keep SSO in milestone','Confirm QA slot','Kabir',CURRENT_DATE+3) ON CONFLICT DO NOTHING`);
}
