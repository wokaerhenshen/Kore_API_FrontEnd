import { Injectable }     from '@angular/core';
import { Component }      from '@angular/core';
import { URLSearchParams, QueryEncoder} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class ProjectModel {
    Name : string;
    StartDate : string;
    EndDate : string;
    ProjectType : string;
}

@Injectable()
export class MyProjectService {
    public site:string;
    constructor(private http: Http) {
        this.site = 'http://localhost:64779/project/';
     }

    //add a project
    postProject(_project: ProjectModel): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});       
        let dataUrl = this.site + "Create";
        let ProjectJson = {         
            "ProjectName": _project.Name,
            "StartDate": _project.StartDate,
            "EndDate": _project.EndDate,
            "ProjectType": _project.ProjectType,
            "ClientId": "78505353-5c24-42c4-bf66-278058e6a108"
        }
        return this.http.post(dataUrl, ProjectJson,options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    //get all projects
    getProjects(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({headers: headers});
        let dataUrl = this.site + "List";
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //get one project
    getOneProject(projectId : string): Observable<Comment[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({headers: headers});
        let dataUrl = this.site + "GetOneProject/" + projectId;
        return this.http.get(dataUrl, options)
                .map(this.extractData)
                .catch(this.handleError);
    }


    //update one project
    updateProject(_project : any): Observable<Comment[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});  
        let dataUrl = this.site + "Update";
        let ProjectJson = {     
            "ProjectId": _project.newProjectId,    
            "ProjectName": _project.newName,
            "StartDate": _project.newStartDate,
            "EndDate": _project.newEndDate
            // "ProjectType": _project.ProjectType,    
        };
        return this.http.put(dataUrl,ProjectJson, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    //delete a project
    deleteProject(id: String): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({headers: headers});
        console.log("Project id:" + id);
        let dataUrl = this.site + "Delete";
        let idJson = {
            "id": id
        };
        return this.http.post(dataUrl,idJson,options)
            .map(this.extractData)
            .catch(this.handleError);
            
    }


    
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // console.log(error.json().err)
        // let errMsg = error.json().err
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}