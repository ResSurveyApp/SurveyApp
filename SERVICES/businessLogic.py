import json
import smtplib
import sqlalchemy
from pymongo import MongoClient
from bson.json_util import dumps,loads
from flask import render_template
import pymongo
import pprint
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from random import choice
import string
from cryptography.fernet import Fernet
import config as cf

# access row by row and update the json file
def parseDF(df_R1,df_R2,df_R3,df_R4,jsonFile,survey,company):
    with open(jsonFile) as json_data:
        js = json.load(json_data)

    #updating surveyName and CompanyName
    js["survey"]=survey
    js["company"]=company

    #updating qid, cid & questions to json file

    R1_phy=df_R1[df_R1['subsector']=='Physical']
    for index, row in R1_phy.iterrows():
      js["R1"]["Physical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R1_org=df_R1[df_R1['subsector']=='Organizational']
    for index, row in R1_org.iterrows():
      js["R1"]["Organizational"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R1_tec=df_R1[df_R1['subsector']=='Technical']
    for index, row in R1_tec.iterrows():
      js["R1"]["Technical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })


    R2_phy=df_R2[df_R2['subsector']=='Physical']
    for index, row in R2_phy.iterrows():
      js["R2"]["Physical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R2_org=df_R2[df_R2['subsector']=='Organizational']
    for index, row in R2_org.iterrows():
      js["R2"]["Organizational"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R2_tec=df_R2[df_R2['subsector']=='Technical']
    for index, row in R2_tec.iterrows():
      js["R2"]["Technical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })


    R3_phy=df_R3[df_R3['subsector']=='Physical']
    for index, row in R3_phy.iterrows():
      js["R3"]["Physical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R3_org=df_R3[df_R3['subsector']=='Organizational']
    for index, row in R3_org.iterrows():
      js["R3"]["Organizational"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R3_tec=df_R3[df_R3['subsector']=='Technical']
    for index, row in R3_tec.iterrows():
      js["R3"]["Technical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })


    R4_phy=df_R4[df_R4['subsector']=='Physical']
    for index, row in R4_phy.iterrows():
      js["R4"]["Physical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R4_org=df_R4[df_R4['subsector']=='Organizational']
    for index, row in R4_org.iterrows():
      js["R4"]["Organizational"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    R4_tec=df_R4[df_R4['subsector']=='Technical']
    for index, row in R4_tec.iterrows():
      js["R4"]["Technical"].append({'qid':row["qid"], 'question': row["question"], 'cid': row["category_id"],  'cname': row["category_name"], 'nist': row["NIST FUNCTION"], 'cat_reference': row["category_Reference"], 'cat_explanation': row["category_Reference_Explanation"]  })

    with open(jsonFile, 'w') as outfile:
      json.dump(js, outfile)


def parseDFusers(df_username,jsonFile,ljsonFile,survey,company):
#     with open(jsonFile) as json_data:
#         js = json.load(json_data)

#     #updating surveyName and CompanyName
#     js["survey"]=survey
#     js["company"]=company

#     #updating qid, cid & questions to json file

#     for index, row in df_username.iterrows():
#       js["users"].append({'username': row["username"], 'email': row["email"], 'role': row["role"], 'department': row["department"], 'userid': index+1, 'activateSurvey': "False", 'isValid': "False", 'password': ""})


#     with open(jsonFile, 'w') as outfile:
#       json.dump(js, outfile)

    with open(jsonFile) as json_data:
        js = json.load(json_data)

    #updating surveyName and CompanyName
    js["survey"]=survey
    js["company"]=company

    #updating qid, cid & questions to json file

    for index, row in df_username.iterrows():
      js["users"].append({'username': row["username"], 'email': row["email"], 'role': row["role"], 'department': row["department"], 'userid': index+1, 'activateSurvey': "False", 'isValid': "False", 'password': ""})

    with open(ljsonFile) as ljson_data:
        ljs = json.load(ljson_data)
    ljs["company"]=company
    col, db = mongoConnect("localhost", "Surveyapp", "login", "user", "pwd")
    for index, rows in df_username.iterrows():
        company_list = list(col.find({"company": company }))
        if company_list:
            json_response = list(col.find({"company": company ,"users.email": rows['email']}))
            print(json_response)
            if not json_response:
                update = col.update({"company":  company},{'$push': {"users" : { '$each':[ {"email" : rows['email'], "password" : "", "forgotphrase" : ""}]}}})
        if not company_list:
            ljs["users"].append({'email': rows["email"], 'password': "", "forgotphrase" : ""})
    if not company_list:
        col.insert(ljs)
    with open(jsonFile, 'w') as outfile:
      json.dump(js, outfile)




# Establishes connection to MongoDB specified collection
def mongoConnect(host,base,colection,user,pwd):

    client = MongoClient(host, 27017)
    db = client[base]
    col = db[colection]
    return col,db


# load json to questions collection
def pushMongoDB(host,database,collection,jsonFile,user,pwd,survey,company):

    col,db = mongoConnect(host,database,collection,user,pwd)
    #check if same survey & comany names alreaday exists in database.. if yes, delte the existing entry in database
    if survey != "":
        col.remove({"survey":survey,"company":company})

    #inserting the json file as document into datbase
    with open(jsonFile) as f:
      data = json.load(f)
    col.insert(data)
    


def getTimeStamp():
    import calendar
    import time
    return calendar.timegm(time.gmtime())



def getMails(survey,company,department):
    col, db = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    mail_list= []
    json_response = list(col.find({"company": company, "survey": survey}, {"users": 1.0, "_id": 0}))
    for i in json_response:
        for attribute, value in i.items():
            for val in value:
                if val['department']== department:
                    mail_list.append(val['email'])
    return mail_list


def pushSurvey(mail_list):
    for mail in mail_list:
        sender = 'root@ith.com'
        receivers = mail

        message = """ 
        
        MAIL BODY ## MAIL BODY ## MAIL BODY  
        Click on the below link to take SURVEY
        
        http://survey.com:5000
                
        """

        smtpObj = smtplib.SMTP('localhost')
        smtpObj.sendmail(sender, receivers, message)
        print("Successfully sent email")

def getSurveyDetails(userid,survey,company,host,base,colection,user,pwd,sector):
   col,db=mongoConnect(host,base,colection,user,pwd)
   uid='%s' % userid
   uid=uid.strip("'")
   query = [{'$match':{'userid':uid,'survey':survey,'company':company}},{'$unwind' : "$rows" }, { '$match' : { "rows.sector" : { '$eq' : sector  } }} ]

   document = col.aggregate(query)
   return document

def getSurveyDetailsAll(survey,company,host,base,colection,user,pwd,sector):
   col, _=mongoConnect(host,base,colection,user,pwd)
   survey='%s' % survey
   survey=survey.strip("'")
   company='%s' % company
   company=company.strip("'")
   query = [{ '$match':{ 'survey':survey,'company':company}} , {'$unwind' : "$rows" },{ '$match' : { "rows.sector" : {'$eq' : sector} } }]
   document = col.aggregate(query)
   return document


def getSurveyDetailsByDept(survey,company,host,base,colection,user,pwd,sector,dept):
   col, _=mongoConnect(host,base,colection,user,pwd)
   survey='%s' % survey
   survey=survey.strip("'")
   company='%s' % company
   company=company.strip("'")
   dept='%s' % dept
   dept=dept.strip("'")
   query = [{ '$match':{ 'survey':survey,'company':company,'department':dept}} , {'$unwind' : "$rows" },{ '$match' : { "rows.sector" : {'$eq' : sector} } }]
   document = col.aggregate(query)
   return document

def mongoInit(colection):
    host='localhost'
    base='Surveyapp'
    user='root'
    pwd='root'
    return host,base,colection,user,pwd

def getcompanynames():
    col, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    company = []
    json_response = list(col.find())
    for i in json_response:
        for attribute, value in i.items():
            if attribute == "company" and value not in company:
                company.append(value)
    return company


def getcompanysurveynames(company):
    col, _= mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    surveys = []

    json_response = list(col.find({"company": company}))
    for i in json_response:
      #print(i.values())
      for key,value in i.items():
        #print(key,"    ",value)
        surveys.append(i['survey'])
    lt=set(surveys)
    surveys=list(lt)
    print(surveys)
    return surveys

def getdepartmentnames(company,survey):
    col, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    department_list = []
    json_response = list(col.find({"company": company, "survey": survey},{"users": 1.0, "_id": 0}))
    for i in json_response:
        for _, value in i.items():
            for val in value:
                department_list.append(val['department'])
        department_list = list(dict.fromkeys(department_list))
    return department_list

def displayquestions(survey,company,sector,subsector,cname, email):
    #cid = category[8:]
    #print(cid)
    coll, dbb = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    doc = list(coll.find({"company": company, "survey": survey}, {"users": 0}))
    id = ""
    msg = ""
    for i in doc:
        id = i['_id']
    surveystatus = ""
    name = ""
    json_response = list(coll.find({"company": company, "survey": survey}, {"users": 1.0, "_id": 0}))
    for i in json_response:
        for attribute, value in i.items():

            for val in value:
                print(val)
                if val['email'] == email and val['activateSurvey'] == "completed":
                    surveystatus = "finished"
                    name = val['username']
    col, id = mongoConnect("localhost", "Surveyapp", "questions", "user", "pwd")
    questions = []
    cname_key = sector + "." + subsector
    json_response = list(col.find({"survey": survey,"company": company},{cname_key: 1.0, "_id": 0}))
    for i in json_response:
        for _, value in i.items():
            for _, val in value.items():
                for v in val:
                    if v['cname'] == cname:
                        questions.append(v)

    if surveystatus == "finished":
        return "done"
    else:
        return questions

def getcategory(survey,company,sector,subsector):
    cname_list=[]
    col,db = mongoConnect("localhost", "Surveyapp", "questions", "user", "pwd")
    cname_key = sector + "." + subsector + ".cname"
    json_response = col.find({"survey" : survey,"company" : company},{ cname_key : 1.0, "_id" : 0})
    for i in json_response:
        for attribute, value in i.items():
            for attr, val in value.items():
                for li in val:
                    cname_list.append(li['cname'])
    cname_list = list(dict.fromkeys(cname_list))
    #cid_list.sort()
    return cname_list


def validate(survey,company,email, host):
    col, db = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    col1, _ = mongoConnect("localhost", "Surveyapp", "login", "user", "pwd")
    # doc = list(col.find({"company": company, "survey": survey}, {"users": 0}))
    # id = ""
    msg = ""
    pwd = ""
    en_password = ""
    flag = False
    # for i in doc:
    #     id = i['_id']
    login_json = col1.find({"company":company, "users.email": email}, {"users": 1, "_id": 0})

    for value in login_json:
        for val in value['users']:
            if val['email'] == email:
                pwd = val['password']
    pd=pwd    
    json_response = list(col.find({"company": company, "users.email": email}, {"users": 1.0, "survey": 1, "_id": 0}))
    for value in json_response:
        # for value in i:
        for val in value['users']:
            if val['email'] == email:
                msg = "done"
                if val['isValid'] == "False":
                    col.update({"survey": value['survey'], "company": company, "users.email": email}, {"$set": {"users.$.isValid": "True", "users.$.password": pwd}})
                    # return render_template('validatescreen.html', company=company, survey=survey)
                elif val['isValid'] == "True" or val['password'] != "":
                    flag = True
                # else:
                    # return render_template('validatedscreen.html',company=company, survey=survey)
                    # msg = "done"
    if pd != "":
        return render_template('validatedscreen.html',company=company, survey=survey, email=email, host=host)
    elif pd == "":
        return render_template('validatescreen.html', company=company, survey=survey, email=email, host=host)
    else:
        return "not a valid user to take survey"

# def register(survey,company,email,username,password):
#     col, db = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
#     doc = list(col.find({"company": company, "survey": survey}, {"users": 0}))
#     id = ""
#     msg = ""
#     for i in doc:
#         id = i['_id']
#     json_response = list(col.find({"company": company, "survey": survey}, {"users": 1.0, "_id": 0}))
#     for i in json_response:
#         for attribute, value in i.items():
#             for val in value:
#                 if val['email'] == email:
#                     if val['password'] == "":
#                         response = col.update({"_id": id, "users.email": email}, {"$set": {"users.$.password": password, "users.$.username": username}})
#                         print(response)
#                         msg = "done"
#                         return json.dumps({"status": '200', "message": "Registration is completed"})

#                     else:
#                         msg = "done"
#                         return json.dumps({"status": '404', "message": "This email id is already registered."})

#     if msg == "":
#         return json.dumps({"status": '404', "message": "Not a valid user for registration"})

def register(survey,company,email,username,password):
    col, db = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    col1, db1 = mongoConnect("localhost", "Surveyapp", "login", "user", "pwd")
    doc = list(col.find({"company": company, "survey": survey}, {"users": 0}))
    doc1 = list(col1.find({"company": company}, {"users": 0}))
    id = ""
    id1 = ""
    msg = ""
    for i in doc:
        id = i['_id']
    for i in doc1:
        id1 = i['_id']

    json_response = list(col1.find({"company": company}, {"users": 1.0, "_id": 0}))
    for i in json_response:
        for attribute, value in i.items():
            for val in value:
                if val['email'] == email:
                    if val['password'] == "":
                        en_pwd = en_de_crypt(password, "encrypt")
                        response = col.update({"company": company, "users.email": email}, {"$set": {"users.$.password": en_pwd, "users.$.username": username}} , multi=True)
                        response1 = col1.update({"_id": id1, "users.email": email}, {"$set": {"users.$.password": en_pwd}})

                        msg = "new user"
                        return json.dumps({"status": '200', "message": "Registration is completed"})

                    else:
                        msg = "existing user"
                        return json.dumps({"status": '404', "message": "This email id is already registered."})
                else:
                  msg = ""
    if msg == "":
        return json.dumps({"status": '404', "message": "Not a valid user for registration"})


def userResponseload(data, sector, subsector):
    col, db = mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    ids = []
    countid = ""
    keys = ["emailid","survey","company"]
    find_keys = dict((k, data[k]) for k in keys if k in data)
    #existing_doc = list(col.find({"emailid": check_emailid}))
    p = col.find(find_keys)
    for ppp in col.find(find_keys):
        ids.append(ppp["_id"])
    pp = loads(dumps(p))
    if pp!=[]:
        for id in ids:
            col.remove({"_id": id})
        #col.delete_one(existing_doc)

        col.insert(data)
        countflag = comparecount(find_keys['survey'], find_keys['company'], sector, subsector, find_keys['emailid'])
        coll, dbb = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
        if countflag == "true":
            what = coll.update({"survey": find_keys['survey'], "company" : find_keys['company'], "users.email": find_keys['emailid']}, {"$set": {"users.$.activateSurvey": "completed"}})
        return "deleted and inserted"
    else:
        col.insert(data)
        countflag = comparecount(find_keys['survey'], find_keys['company'], sector, subsector, find_keys['emailid'])
        coll, dbb = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
        if countflag == "true":
            coll.update({"survey": find_keys['survey'], "company" : find_keys['company'], "users.email": find_keys['emailid']}, {"$set": {"users.$.activateSurvey": "completed"}})
        return "document is inserted"

def comparecount(survey, company, sector, subsector, email):
    col, db = mongoConnect("localhost", "Surveyapp", "questions", "user", "pwd")
    qcount = 0
    for s in sector:
        for ss in subsector:
            q_key = s + "." + ss
            json_response = list(col.find({"survey": survey, "company": company}, {q_key: 1.0, "_id": 0}))
            print(json_response)
            for i in json_response:
                for attribute, value in i.items():
                    for attr, val in value.items():
                        for v in val:
                            if v['question'] != "":
                                qcount = qcount + 1
    col1, db1 = mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    scount = 0
    json_response = list(col1.find({"survey": survey, "company": company, "emailid" :email}, {"rows.qscore": 1.0, "_id": 0}))
    for i in json_response:
        for attribute, value in i.items():
            for val in value:
                if val['qscore'] != "":
                    scount = scount + 1
    if qcount == scount :
        return "true"
    else:
        return "false"

def saveUserResponse(data):
    print("done")

def userLogin(data, jsonFile):
    col, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    print(data['email'])
    print(data['password'])   ## admin
    prompt_pwd=data['password']
    
    #en_pwd = en_de_crypt(prompt_pwd, "decrypt")
    
    with open(jsonFile) as json_data:
        js = json.load(json_data)
    jsonresponse = col.find({"users.email": data['email']}, {"_id": 0})
    survey = ""
    company = ""
    
    for i in jsonresponse:
        for value in i["users"]:
         #print(i)
         if value['email'] == data['email']:
          print("Insdide 1", value["password"] )
          pwd = en_de_crypt(value["password"], "decrypt")
          if pwd == prompt_pwd and value["email"] == data["email"] :
               # print("came into the if condition")
                if value["role"] == "Admin" or value["isValid"] == "True" :
                    #print("came into the 2nd if condition")
                    company = (i['company'])
                    survey = (i['survey'])
    js["survey"] = survey
    js["company"] = company
    jsonresponses = col.find({"survey":survey, "company":company, "users.email": data['email']}, {"users": 1.0, "_id": 0})
    for j in jsonresponses:
        for _, l in j.items():
            for m in l:
              if m['email'] == data['email']:
                mpwd = en_de_crypt(m["password"], "decrypt")
                if m['email'] == data['email'] and mpwd == prompt_pwd:
                    js["users"].append(m)
                    if m['role'] == "Admin":
                        js["isAdmin"] = "true"
                        js["isValid"] = "true"
                    elif m['isValid'] == 'True':
                        js["isAdmin"] = "false"
                        js["isValid"] = "true"
                    else:
                        js["isAdmin"] = "false"
                        js["isValid"] = "false"
    return js


def getUsers(dept,company,host,base,colection,user,pwd):
   col, _=mongoConnect(host,base,colection,user,pwd)
   company='%s' % company
   company=company.strip("'")
   dept='%s' % dept
   dept=dept.strip("'")
   users=[]
   json_response = list(col.find({"company": company},{"users": 1.0, "_id": 0}))
   print(json_response,colection)
   for i in json_response:
      for _, value in i.items():
         for val in value:
             if val['department']==dept:
               users.append(val['email'])
   return users


def getID(dept,company,email,survey,host,base,colection,user,pwd):
   col, _=mongoConnect(host,base,colection,user,pwd)

   company='%s' % company
   company=company.strip("'")
   survey='%s' % survey
   survey=survey.strip("'")
   dept='%s' % dept
   dept=dept.strip("'")
   email='%s' % email
   email=email.strip("'")

   id=[]
   json_response = list(col.find({"company": company},{"users": 1.0, "_id": 0}))
   print(json_response,colection)
   for i in json_response:
      for _, value in i.items():
         for val in value:

             if (val['department']==dept) & (val['email']==email):
               id.append(val['userid'])
   return id


def parse(df,sec,subsec,n):
        df1=df[(df['sector']==sec) & (df['subsector']==subsec)]
        list=df1['category_name'].unique()
        cn=n
        for i in list:
           df1.loc[df1['category_name'] == i, 'category_id'] = cn
           cn+=1
        df1.category_id=df1.category_id.astype(int)
        return df1,cn

def getquestioncount(company, survey, sectors, subsectors):

    col, db = mongoConnect("localhost", "Surveyapp", "questions", "user", "pwd")
    qcount = 0
    for s in sectors:
        for ss in subsectors:
            q_key = s + "." + ss
            json_response = list(col.find({"survey": survey, "company": company}, {q_key: 1.0, "_id": 0}))
            for i in json_response:
                for attribute, value in i.items():
                    for attr, val in value.items():
                        for v in val:
                            if v['question'] != "":
                                qcount = qcount + 1
    return qcount

def getusercompanynames():
    col, _ = mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    company = []
    json_response = list(col.find())
    for i in json_response:
        for attribute, value in i.items():
            if attribute == "company" and value not in company and len(i['sector']) == 4:
                company.append(value)
    return company


def getusercompanysurveynames(company):
    col, _= mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    surveys = []
    json_response = list(col.find())
    for i in json_response:
        for _, value in i.items():
            if value == company and i['survey'] not in surveys and len(i['sector']) == 4:
                surveys.append(i['survey'])
    return surveys

def getuserdepartmentnames(company,survey):
    col, _ = mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    department_list = []
    json_response = list(col.find())
    print(json_response)
    for i in json_response:
        if i['company'] == company and i['survey'] == survey and i['department'] not in department_list and len(i['sector']) == 4:
            print(i['department'])
            department_list.append(i['department'])
            print(department_list)
    return department_list

def getautoSavedResponse(company, survey, email):
    response = []
    col, db = mongoConnect("localhost", "Surveyapp", "users", "user", "pwd")
    json_response = list(col.find({"survey": survey, "company": company, "emailid" : email},{"_id": 0}))
    print(json_response)
    for i in json_response:
        response.append(i)
    return response



def sendReport(survey,company,file):
    email_user = 'perugubharathkumar@gmail.com'
    email_password = 'Blackpearl@88'
    email_send = ['mhaqu001@odu.edu','shetty.tsu@gmail.com','bharathkumar.perugu@gmail.com']

    subject = 'Metrics Report ..!!!'

    msg = MIMEMultipart()
    msg['From'] = email_user
    msg['Subject'] = subject

    body = 'Hi there, ' \
           '' \
           'Please refer the attached detailed metrics report for survey - {} in company - {} '.format(survey,company)
    msg.attach(MIMEText(body,'plain'))
    attachment  =open(file,'rb')
    part = MIMEBase('application','octet-stream')
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition',"attachment; filename= "+file)
    msg.attach(part)
    text = msg.as_string()
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(email_user,email_password)

    for mail in email_send:
      server.sendmail(email_user,mail,text)
    server.quit()

def otp(email,company):
    chars = string.digits
    random =  ''.join(choice(chars) for _ in range(4))
    col1, db1 = mongoConnect("localhost", "Surveyapp", "login", "user", "pwd")
    doc1 = list(col1.find({"company": company}, {"users": 0}))
    id1 = ""
    for i in doc1:
        id1 = i['_id']
    response1 = col1.update({"_id": id1, "users.email": email}, {"$set": {"users.$.forgotphrase": random}})
    print(response1)
    return random

def resetpassword(email,company,password,forgotphrase):
    col1, _ = mongoConnect("localhost", "Surveyapp", "login", "user", "pwd")
    users, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    doc1 = list(col1.find({"company": company}, {"users": 0}))
    print(doc1, 'By checking')
    id1 = ""
    for i in doc1:
        id1 = i['_id']
    json_response = list(col1.find({"company": company}, {"users": 1.0, "_id": 0}))
    print(json_response, 'By checking')
    for i in json_response:
        for attribute, value in i.items():
            for val in value:
                if val['email'] == email:
                    if val['forgotphrase'] == forgotphrase:
                        en_pwd = en_de_crypt(password, "encrypt")
                        response1 = col1.update({"_id": id1, "users.email": email}, {"$set": {"users.$.password": en_pwd}})
                        response2 = users.update({"company": company, "users.email": email}, {"$set": {"users.$.password": en_pwd}}, multi=True)
                        # print(response1, r)
                        return json.dumps({"status": '200', "message": "Password reset is successful"})
                    else:
                        return json.dumps({"status": '404', "message": "Please provide correct opt"})

def convertToPDF(wordFile):
    return wordFile

def getAllSurvey(email, company):
    db, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    doc = db.find({'company': company, 'users.email': email, 'users.isValid' : 'True' }, {'survey' : 1 ,'users':1,  '_id' : 0})
    output = []
    for value in doc:
        for val in value['users']:
            if val['activateSurvey'] == 'completed' and val['email'] == email:
                output.append(value['survey'] + ' - Completed')
            elif val['email'] == email and val['isValid'] == "True":
                output.append(value['survey'])
    return dumps(output)

def getnoofsurveys(survey,company):

    db, _ = mongoConnect("localhost", "Surveyapp", "userdetails", "user", "pwd")
    doc = db.find({'company': company, 'survey': survey }, {'users':1,  '_id' : 0})
    for i in doc:
      x=i['users']
      count=str(len(x))
    return count


def en_de_crypt(plain_text, en_de):
    #key = Fernet.generate_key()
    #print(key)
    #print(cf.key)
    key=cf.key
    f = Fernet(key.decode('utf-8'))
    print(key)
    print("In cypher methond")
    print(plain_text)

    if en_de == "encrypt":
        text=plain_text.encode()
        token = f.encrypt(text)
        txt=token.decode('utf-8')
        print("Encryted : {}".format(txt))
        return txt

    if en_de == "decrypt":
        token = plain_text.encode()
        uncipher_text = (f.decrypt(token))
        dec_txt = bytes(uncipher_text).decode("utf-8")
        print("Decrypted : {}".format(dec_txt))
        return dec_txt

