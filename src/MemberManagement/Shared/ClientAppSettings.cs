namespace MemberManagement.Shared
{
    public class ClientAppSettings
    {
        public string Title { get; set; } = default!;
        public string CultureInfo { get; set; } = default!;
        public int CacheExpiration { get; set; } = 0;
    }
}
