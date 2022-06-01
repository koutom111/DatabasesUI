delimiter //
CREATE TRIGGER EvaluatorCheck BEFORE INSERT ON Evaluation
FOR EACH ROW
BEGIN
DECLARE msg varchar(45);
IF NEW.Researcher_ID IN (SELECT c.Researcher_ID 
					     FROM Works_For c
                         INNER JOIN Project r ON c.Organization_Name=r.Organization_Name
                         WHERE NEW.Project_Title=r.Project_Title
                        )
THEN
SET msg=('This researcher is already working for the organization on this project');
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=msg;
END IF;
END//
delimeter;


