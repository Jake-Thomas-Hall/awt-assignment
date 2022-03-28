<?php

class PageManagement {
    public function updatePageContent(int $id, string $content): void {
        global $connection;

        $date = date('Y-m-d H:i:s');

        $pageContentQuery = $connection->prepare("UPDATE tbl_page_sections SET tbl_page_sections.content = ?, tbl_page_sections.updated = ? WHERE tbl_page_sections.id = ?;");
        $pageContentQuery->bind_param("ssi", $content, $date, $id);
        $pageContentQuery->execute() ?: throw new Exception("Error while updating page content.");
    }

    public function getPageContent(string $page): array {
        global $connection;
        $pageContentArray = [];

        $pageContentQuery = $connection->prepare("SELECT tbl_page_sections.id, tbl_page_sections.content, tbl_page_sections.page, tbl_page_sections.pageSection FROM `tbl_page_sections` where tbl_page_sections.page = ?;");
        $pageContentQuery->bind_param("s", $page);
        $pageContentQuery->execute();

        $result = $pageContentQuery->get_result() ?: throw new Exception("Error while fetching $page content");

        $pageContentArray = $result->fetch_all(MYSQLI_ASSOC);

        return $pageContentArray;
    }
}