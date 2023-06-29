CREATE TABLE dbo.DetailsEmployee (
    EmployeeId INT PRIMARY KEY,
    EmployeeName VARCHAR(50) NOT NULL,
    EmployeeSurname VARCHAR(50) NOT NULL,
    EmployeeDepartment VARCHAR(50) NOT NULL,
    EmployeeStartDate DATE NOT NULL DEFAULT GETDATE(),
    EmployeePassword VARCHAR(50) NOT NULL,
	EmployeeOrManager VARCHAR(50) NOT NULL
);

INSERT INTO dbo.DetailsEmployee(EmployeeId, EmployeeName, EmployeeSurname, EmployeeDepartment, EmployeePassword, EmployeeOrManager)
VALUES (100, 'Brendon', 'Mamvura', 'IT', 'tin@07vhat', 'employee');

CREATE TABLE dbo.ReportEmployees (
    ReportId INT PRIMARY KEY,
    EmployeeId INT NOT NULL,
    ReportDate DATE NOT NULL,
    NoOfHrsWorkedOn INT NOT NULL,
    TaskWorkedOn VARCHAR(100) NOT NULL,
    AddDay INT NOT NULL,
    ManagerReport NVARCHAR(MAX) NOT NULL
);

INSERT INTO dbo.ReportEmployees (ReportId, EmployeeId, ReportDate, NoOfHrsWorkedOn, TaskWorkedOn, AddDay, ManagerReport)
VALUES (4, 102, '2002-04-01', 5, 'development', 2, 'nice');

CREATE TABLE dbo.LeaveRequestEmployees (
    LeaveRequestId INT PRIMARY KEY,
    EmployeeId INT NOT NULL,
    LeaveDate DATE NOT NULL,
    LeaveReason VARCHAR(100) NOT NULL,
    SubmissionDate DATE NOT NULL,
    LeaveStatus BIT NOT NULL
);

INSERT INTO dbo.LeaveRequestEmployees (LeaveRequestId, EmployeeId, LeaveDate, LeaveReason, SubmissionDate, LeaveStatus)
VALUES (4, 102, '2002-05-01', 'sick', '2002-04-01', 1);