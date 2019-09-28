import matplotlib.pyplot as plt
import businessLogic as bl
import pandas as pd
import json
import numpy as np
from bson.json_util import dumps,loads



def calculate(R_df,colection):

  phy=R_df[R_df['subsector']=='Physical']
  org=R_df[R_df['subsector']=='Organizational']
  tech=R_df[R_df['subsector']=='Technical']
  phycid=phy.cid.unique()
  orgcid=org.cid.unique()
  techcid=tech.cid.unique()

  subs=['Physical','Organizational','Technical']
  host,base,colection,user,pwd=bl.mongoInit(colection)
  ## userid,survey,company  should be passed from UI with API
  ##userid='588'
  ##company='ITH'
  ##survey='Quater 1'

  x=df=pd.DataFrame()
  for sub in subs:
    subdf=R_df[R_df['subsector']==sub]
    subcid=subdf.cid.unique()

    for i in subcid:
      #  print("i value is ", i, sub)
        subscore=subdf[subdf.cid==i].qscore.sum()/len(subdf[subdf.cid==i].index)
        df=subdf[subdf.cid==i]
        df['cscore']=round(subscore,2)
        x=pd.concat([df, x], ignore_index=True)
       # print(subcid)

  df=x.sort_values(['cid']) # df has mean values of cscore i.e category score in R1
 # print(df)
  return df


def pie(df):

    pieR1=df[df['sector']=='R1']['avgsectscore'].unique()
    pieR1= round(float(pieR1),2)

    pieR2=df[df['sector']=='R2']['avgsectscore'].unique()
    pieR2= round(float(pieR2),2)

    pieR3=df[df['sector']=='R3']['avgsectscore'].unique()
    pieR3= round(float(pieR3),2)

    pieR4=df[df['sector']=='R4']['avgsectscore'].unique()
    pieR4= round(float(pieR4),2)

    data = json.dumps({'R1': pieR1, 'R2': pieR2, 'R3':pieR3, 'R4':pieR4})
    return data

def getTable(df,sectors,subsectors):
    list=[]
    firstrow=['SECTOR|SUBSECTOR', 'Physical', 'Organizational', 'Technical']
    list.append(firstrow)
    for sector in sectors:
       values=[]
       values.append(sector)
       for subsec in subsectors:
          values.append(round(float(df[(df['sector']==sector) & (df['subsector']==subsec)]['subsector_avg'].unique()),2))
       list.append(values)
    return dumps(list)

def bar(df):

    barR1=[]
    barR1.append(round(float(df[(df['sector']=='R1') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2))
    barR1.append(round(float(df[(df['sector']=='R1') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2))
    barR1.append(round(float(df[(df['sector']=='R1') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2))

    barR2=[]
    barR2.append(round(float(df[(df['sector']=='R2') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2))
    barR2.append(round(float(df[(df['sector']=='R2') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2))
    barR2.append(round(float(df[(df['sector']=='R2') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2))

    barR3=[]
    barR3.append(round(float(df[(df['sector']=='R3') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2))
    barR3.append(round(float(df[(df['sector']=='R3') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2))
    barR3.append(round(float(df[(df['sector']=='R3') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2))

    barR4=[]
    barR4.append(round(float(df[(df['sector']=='R4') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2))
    barR4.append(round(float(df[(df['sector']=='R4') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2))
    barR4.append(round(float(df[(df['sector']=='R4') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2))

    data = json.dumps({'R1': barR1, 'R2': barR2, 'R3':barR3, 'R4':barR4})
    return data

def radar(df):

    set1=set2=set3=[]
    set1=[ round(float(df[(df['sector']=='R1') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R2') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R3') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R4') & (df['subsector']=='Physical')]['subsector_avg'].unique()),2)]

    set2=[ round(float(df[(df['sector']=='R1') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R2') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R3') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R4') & (df['subsector']=='Organizational')]['subsector_avg'].unique()),2)]

    set3=[ round(float(df[(df['sector']=='R1') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R2') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R3') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2),
           round(float(df[(df['sector']=='R4') & (df['subsector']=='Technical')]['subsector_avg'].unique()),2)]

    data = json.dumps({'Physical': set1, 'Organizational': set2, 'Technical':set3 })
    return data

def radarBySector(df,sectors):
   set=[]
   setlabel=[]
   for sec in sectors:

       df1=df[df['sector']==sec]
       clist=df1.cid.unique()
       for i in clist:
           x=df1[df1['cid']==i]
           set.append(x['cscore'].unique())
           setlabel.append(x['cname'].unique())
           set=np.array(set).tolist()
           setlabel=np.array(setlabel).tolist()
           merged_list = []
           for l in set:
             merged_list+=l
           merged_label = []
           for j in setlabel:
             merged_label += j
       if sec == 'R1':
         set1=merged_list
         label1=  merged_label
       elif sec == 'R2':
         set2=merged_list
         label2=  merged_label
       elif sec == 'R3':
         set3=merged_list
         label3=  merged_label
       elif sec == 'R4':
         set4=merged_list
         label4=  merged_label
       set=[]
       setlabel=[]

   data= [
           {"sector":"R1","labels":label1,"score":set1},
           {"sector":"R2","labels":label2,"score":set2},
           {"sector":"R3","labels":label3,"score":set3},
           {"sector":"R4","labels":label4,"score":set4}
         ]
   return dumps(data)



def radarAllSectors(df,sectors):
    set=[]
    setlabel=[]
    clist=df.cid.unique()
    for i in clist:
        x=df[df['cid']==i]

        set.append(x['cscore'].unique())
        setlabel.append(x['cname'].unique())
        set=np.array(set).tolist()
        setlabel=np.array(setlabel).tolist()
        merged_list = []
        for l in set:
          merged_list+=l
        merged_label = []
        for j in setlabel:
          merged_label += j

    set=merged_list
    labels=  merged_label


    data = {
             "category":labels,
             "scores":set
        }

    return dumps(data)

def genFullRadar(sectors,subsectors,subscores):

    import matplotlib
    matplotlib.use('Agg')
    from matplotlib import pyplot


    ###################  PIE-DONUT-RADAR CHART ######################
    x=subscores
    labels = sectors
    sizes = [subscores[0]+subscores[4]+subscores[8], subscores[1]+subscores[5]+subscores[9], subscores[2]+subscores[6]+subscores[10], subscores[3]+subscores[7]+subscores[11]]  # have to calculate from subscores
    labels_sub = ['Physical (score - {})'.format(x[0]),'Organizational ({})'.format(x[1]),'Technical ({})'.format(x[2]),'Physical ({})'.format(x[3]),'Organizational ({})'.format(x[4]),'Technical ({})'.format(x[5]),'Physical ({})'.format(x[6]),'Organizational ({})'.format(x[7]),'Technical ({})'.format(x[8]),'Physical ({})'.format(x[9]),'Organizational ({})'.format(x[10]),'Technical ({})'.format(x[11])]
    sizes_sub = x
    colors = ['#ff6666', '#ffcc99', '#99ff99', '#66b3ff']
    colors_sub = ['#ff6666','#ff6666','#ff6666','#ffcc99','#ffcc99','#ffcc99','#99ff99','#99ff99','#99ff99','#66b3ff','#66b3ff','#66b3ff']
    explode = (0.2,0.2,0.2,0.2)
    explode_sub = (0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1)
    #Plot
    plt.pie(sizes, startangle=90,colors=colors,radius=2)
    plt.legend(labels, fontsize = 'large', fancybox = True)
    plt.pie(sizes_sub,explode=explode_sub,labels=labels_sub,startangle=90,colors=colors_sub,textprops={'fontsize': 20},frame=True,radius=4 )

    centre_circle = plt.Circle((0,0),2.5,color='black', fc='white',linewidth=0) #### Chnage 2.75 to see diff variations
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)
    fig.set_size_inches(20, 15, forward=False)
    plt.axis('equal')
    #plt.tight_layout()
    #plt.title('Overall Resilience Metrics Summary \n \n')

    file='Report_{}.png'.format(bl.getTimeStamp())
    plt.savefig(file, bbox_inches = "tight")
    plt.close()
    return file

    ################## RADAR CHARTS #################

def genRadar(labels,values,clr,sector):

    import matplotlib
    matplotlib.use('Agg')
    from matplotlib import pyplot
    from math import pi

    N = len(values)
    # What will be the angle of each axis in the plot? (we divide the plot / number of variable)
    angles = [n / float(N) * 2 * pi for n in range(N)]
    angles += angles[:1]
    cn=len(labels)
    for i in range(cn):
      labels[i]=labels[i]+' ('+(str(values[i]))+')'
    # Initialise the spider plot
    ax = plt.subplot(111, polar=True)

    # Draw one axe per variable + add labels labels yet
    plt.xticks(angles[:-1], labels, color='black', size=9)
    # # Draw ylabels
    ax.set_rlabel_position(0)
    values += values[:1]
    # Draw ylabels

    plt.yticks([1,2,3,4,5], ["1","2","3","4","5"], color="black", size=8)
    plt.ylim(0,5)

    # # # Plot data
    ax.plot(angles, values, linewidth=1.5,color=clr, linestyle='solid')
    # # # Fill area
    ax.fill(angles, values, color=clr, alpha=1)
    # Add a title
    #plt.title('{} metrics radar display'.format(sector), size=11, color='k', y=1.1)

    file='Report_{}_{}.png'.format(sector,bl.getTimeStamp())
    plt.savefig(file, bbox_inches = "tight")
    plt.close()
    return file

def barh(labels,values):
    df=pd.DataFrame(columns=['labels','values','color'])
    df['labels']=labels
    df['values']=values.astype(float)

    df.loc[df['values']>=4, 'color']='blue'
    df.loc[(df['values']>=3) & (df['values']<4), 'color' ]='green'
    df.loc[(df['values']>=2) & (df['values']<3), 'color' ]='purple'
    df.loc[df['values']<2,'color']='red'
    df['Metrics']=df['labels']+'('+df['values'].astype(str)+')'
    df=df.set_index('Metrics')

    fig = plt.figure(figsize=(14,16))

    ax = fig.add_subplot(111)
    title = 'Areas doing well and areas needing attention'
    df['values'].plot(kind='barh', ax=ax, alpha=0.6, legend=False, color=df.color, edgecolor='w', xlim=(0,max(df['values'])), title=title)
    #print(df)

    file='Report_{}_{}.png'.format('barh',bl.getTimeStamp())
    plt.savefig(file, bbox_inches = "tight")
    plt.close()
    return file

def barRadar(sec,values,subsecs):
    y_pos = np.arange(len(subsecs))
    plt.bar(y_pos, values, color=['#ff6666', '#ffcc99', '#99ff99'])
    plt.xticks(y_pos, subsecs)
    plt.ylim(0, 5)
    file='radar_{}_{}.png'.format(sec,bl.getTimeStamp())
    plt.savefig(file, bbox_inches = "tight")
    plt.close()
    return file
