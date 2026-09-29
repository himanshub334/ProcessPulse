import {query} from '../db';
export function rag(sp:number,days:number){const rate=days<=0?Infinity:sp/days;if(rate>3)return 'RED';if(rate>1.5)return 'AMBER';return 'GREEN'}
export async function metrics(){
 const velocity=(await query(`SELECT s.name,COALESCE(SUM(i.story_points) FILTER(WHERE i.status='Done'),0)::float completed FROM sprints s LEFT JOIN issues i ON i.sprint_id=s.id GROUP BY s.id ORDER BY s.id DESC LIMIT 8`)).rows;
 const cycle=(await query(`SELECT type,ROUND(AVG(EXTRACT(EPOCH FROM(resolved_at-created_at))/86400)::numeric,2)::float days FROM issues WHERE resolved_at IS NOT NULL GROUP BY type`)).rows;
 const deployments=(await query(`SELECT date_trunc('week',deployed_at) week,COUNT(*)::int count FROM deployments GROUP BY 1 ORDER BY 1 DESC LIMIT 8`)).rows.reverse();
 return {velocity:velocity.reverse(),cycleTime:cycle,deploymentFrequency:deployments};
}
