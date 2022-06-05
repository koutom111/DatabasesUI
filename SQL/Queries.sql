#3.1
SELECT P.Project_Title AS Project_Title, 
	P.Program_Title,
	P.Summary AS Summary, 
	P.Starting_Date AS Starting_Date, 
	P.Duration AS Duration,
	CONCAT(E.First_Name , ' ' ,E.Last_Name) AS ExName FROM Project P 
	INNER JOIN Executive E ON P.Executive_ID=E.Executive_ID WHERE P.Due_Date>curdate()


#3.3
SELECT  F.Scientific_Field AS SField, 
P.Project_Title AS Title, 
CONCAT(R.First_Name , ' ' ,R.Last_Name) AS RName 
FROM Field F 
INNER JOIN Project P ON P.Project_Title = F.Project_Title 
INNER JOIN Works_On W ON W.Project_Title = P.Project_Title 
INNER JOIN Researcher R ON R.Researcher_ID = W.Researcher_ID 
WHERE P.Starting_Date <= '2021-06-05' AND P.Due_Date >= '2022-06-05' ")

#3.4
SELECT * FROM
(SELECT Organization_Name, Ye,  Project_Cnt , LEAD(Project_Cnt, 1) 
OVER (PARTITION BY Organization_Name ORDER BY Ye) Next_Project_Cnt
FROM
	(SELECT COUNT(P.Project_Title) AS Project_Cnt, 
		O.Organization_Name , 
		YEAR(P.Starting_Date) AS Ye
	 FROM Organization O
	 INNER JOIN Project P ON P.Organization_Name = O.Organization_Name 
	 GROUP BY O.Organization_Name, YEAR(P.Starting_Date)
	 HAVING COUNT(P.Project_Title) >= 10
	) A
) B
WHERE Project_Cnt = Next_Project_Cnt;


#3.5
SELECT F1.Scientific_Field, F2.Scientific_Field, COUNT(F1.Project_Title)
FROM Field F1
INNER JOIN Field F2
        ON F1.Project_Title = F2.Project_Title
       AND F1.Scientific_Field < F2.Scientific_Field
WHERE F1.Scientific_Field <> F2.Scientific_Field        
GROUP BY F1.Scientific_Field, F2.Scientific_Field
ORDER BY COUNT(F1.Project_Title) DESC
LIMIT 3;


#3.6
SELECT R.Researcher_ID, R.Last_Name, R.First_Name, COUNT(W.Project_Title) Project_Cnt
FROM Researcher R
INNER JOIN Works_On W
		ON W.Researcher_ID = R.Researcher_ID
WHERE R.Age < 40
GROUP BY R.Researcher_ID, R.Last_Name, R.First_Name
HAVING COUNT(Project_Title) = (SELECT MAX(Project_Cnt)
				 FROM
				 (SELECT R.Researcher_ID, R.Last_Name, R.First_Name,
				 COUNT(W.Project_Title) Project_Cnt
				 FROM Researcher R
				 INNER JOIN Works_On W	ON W.Researcher_ID = R.Researcher_ID
                                INNER JOIN Project P ON P.Project_Title = W.Project_Title
				 WHERE R.Age < 40 AND P.Due_Date >= '2022-05-28'
				 GROUP BY R.Researcher_ID, R.Last_Name, R.First_Name
				 ) A);

                                    
#3.7
SELECT SUM(P.Grant), C.Organization_Name, E.First_Name, E.Last_Name
FROM Executive E
INNER JOIN Project P ON E.Executive_ID = P.Executive_ID
INNER JOIN Organization O ON O.Organization_Name = P.Organization_Name
INNER JOIN Corporation C ON C.Organization_Name = O.Organization_Name
GROUP BY C.Organization_Name, E.Executive_ID 
ORDER BY SUM(P.Grant) DESC
LIMIT 5;


#3.8
SELECT COUNT(P.Project_Title), R.First_Name, R.Last_Name
FROM Researcher R
INNER JOIN Works_On W ON R.Researcher_ID = W.Researcher_ID
INNER JOIN Project P ON P.Project_Title = W.Project_Title
LEFT JOIN Deliverable D ON D.Project_Title = P.Project_Title
WHERE D.Project_Title IS NULL   
GROUP BY  R.First_Name, R.Last_Name
HAVING (COUNT(P.Project_Title))>=5;  

                                  
