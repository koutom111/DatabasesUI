CREATE TRIGGER IsEvaluator BEFORE INSERT ON Works_On
FOR EACH ROW
BEGIN 
DECLARE msg varchar(45);
IF NEW.Researcher_ID IN (SELECT c.Researcher_ID FROM Evaluation c
						 INNER JOIN Works_On r ON c.Project_Title=r.Project_Title)
THEN 
SET msg=('This researcher is already an evaluator in this project');
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=msg;
END IF;
END
