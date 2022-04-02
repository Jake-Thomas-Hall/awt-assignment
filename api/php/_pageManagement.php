<?php

class PageManagement {
    public function updatePageContent(int $id, string $content): void {
        global $connection;

        // Get current date time so that this can be inserted upon update.
        $date = date('Y-m-d H:i:s');

        // Perform the insert.
        $pageContentQuery = $connection->prepare("UPDATE tbl_page_sections SET tbl_page_sections.content = ?, tbl_page_sections.updated = ? WHERE tbl_page_sections.id = ?;");
        $pageContentQuery->bind_param("ssi", $content, $date, $id);
        $pageContentQuery->execute() ?: throw new Exception("Error while updating page content.");
    }

    public function sendEnquiryEmail(string $name, string $email, string $message, string $company = "") {
        $config = include(__DIR__ . '/../config.php');
        // Since email will be HTML format text, convert new lines to <br>
        $messageConverted = nl2br($message);
        // Format the subject based on the provided name, and add company to it if that is provided as well.
        $subjectFormatted = "Contact enquiry from $name";
        if (!empty($company)) {
            $subjectFormatted = $subjectFormatted . " - company '$company'";
        }
        
        // Add the contact email and name to the end of the email content.
        $messageConverted = $messageConverted . "<br/><br/><strong>Contact email</strong>: $email<br/><strong>Name</strong>: $name";

        // Send email
        $to = $config->admin_email;
        $subject = $subjectFormatted;
        $message = $messageConverted;
        $headers = [
            'From' => $config->app_email,
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'text/html; charset=UTF-8',
            'Reply-To' => $email
        ];

        mail($to, $subject, $message, $headers);
    }

    public function getPageContent(string $page): array {
        global $connection;

        // Get all the content for a page by the "page" descriptor in the table, is formatted into a response in the individual page endpoints
        // This saves needing to requery multiple times to fetch all page content, can just be fetched in one go.
        $pageContentQuery = $connection->prepare("SELECT tbl_page_sections.id, tbl_page_sections.content, tbl_page_sections.page, tbl_page_sections.pageSection FROM `tbl_page_sections` where tbl_page_sections.page = ?;");
        $pageContentQuery->bind_param("s", $page);
        $pageContentQuery->execute();

        $result = $pageContentQuery->get_result() ?: throw new Exception("Error while fetching $page content");

        $pageContentArray = $result->fetch_all(MYSQLI_ASSOC);

        return $pageContentArray;
    }
}